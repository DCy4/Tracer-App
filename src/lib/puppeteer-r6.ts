import puppeteer from 'puppeteer';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// puppeteer.use(StealthPlugin());

export async function scrapeR6Stats(username: string, platform: string = 'pc') {
  console.log(`Scraping fresh data for ${username} using Puppeteer Stealth`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set a real user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    // Use the overview URL
    const url = `https://r6.tracker.network/r6siege/profile/${platform}/${username}/overview`;
    console.log(`Navigating to ${url}`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const stats = await page.evaluate(() => {
      const findValueByLabel = (label: string) => {
        const elements = Array.from(document.querySelectorAll('*'));
        const labelEl = elements.find(el => el.textContent && el.textContent.trim() === label);
        if (labelEl) {
          if (labelEl.nextElementSibling) return labelEl.nextElementSibling.textContent?.trim() || null;
          if (labelEl.parentElement && labelEl.parentElement.nextElementSibling) {
            return labelEl.parentElement.nextElementSibling.textContent?.trim() || null;
          }
          if (labelEl.parentElement) {
            const children = Array.from(labelEl.parentElement.children);
            const index = children.indexOf(labelEl);
            if (index > -1 && index + 1 < children.length) {
              return children[index + 1].textContent?.trim() || null;
            }
          }
        }
        return null;
      };

      return {
        level: parseInt(findValueByLabel('Level') || '0'),
        kd: parseFloat(findValueByLabel('K/D') || '0'),
        wl: parseFloat(findValueByLabel('Win %') || '0'),
        rank: document.querySelector('.rank-name')?.textContent?.trim() || 'Unranked',
        mmr: parseInt(findValueByLabel('MMR') || '0'),
        matches: parseInt(findValueByLabel('Matches') || '0'),
        timePlayed: findValueByLabel('Time Played') || '0h',
        headshotPct: parseFloat(findValueByLabel('Headshot %') || '0')
      };
    });

    return {
      username,
      platform,
      avatar: null,
      ...stats
    };

  } catch (error) {
    console.error('Error scraping R6Tracker:', error);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}
