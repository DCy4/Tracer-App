const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set a real user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
    console.log('Navigating to R6Tracker...');
    await page.goto('https://r6.tracker.network/', { waitUntil: 'networkidle2' });
    
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    
    // Check if we are blocked
    const content = await page.content();
    if (content.includes('Cloudflare') || content.includes('Verify you are human')) {
        console.log('Blocked by Cloudflare');
    } else {
        console.log('Not blocked!');
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
