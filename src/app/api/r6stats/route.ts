import { NextResponse } from 'next/server';
import { scrapeR6Stats } from '@/lib/puppeteer-r6';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Use require for CJS module compatibility
const r6apiModule = require('r6api.js');
const R6API = r6apiModule.default || r6apiModule;

// Initialize the API with credentials from environment variables
console.log('Initializing R6API with:', process.env.UBI_EMAIL ? 'Email provided' : 'No Email');
const r6api = new R6API({
  email: process.env.UBI_EMAIL,
  password: process.env.UBI_PASSWORD
});

// Cache interface
interface CacheEntry {
  data: any;
  timestamp: number;
}

// In-memory cache
const cache: { [key: string]: CacheEntry } = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Default players to track
const DEFAULT_PLAYERS = [
  { name: 'Spoit', platform: 'uplay' },
  { name: 'Shaiiko', platform: 'uplay' }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const platform = searchParams.get('platform') || 'uplay';

    // Determine which players to fetch
    let playersToFetch = DEFAULT_PLAYERS;
    if (username) {
      playersToFetch = [{ name: username, platform }];
    }

    // Generate a cache key
    const cacheKey = username ? `${username}-${platform}` : 'default-list';

    // Check cache
    const cachedEntry = cache[cacheKey];
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_DURATION)) {
      console.log(`Serving ${cacheKey} from cache`);
      return NextResponse.json(cachedEntry.data);
    }

    console.log(`Fetching fresh data for ${cacheKey}`);

    let combinedData;

    // Try r6api.js first if credentials are present
    if (process.env.UBI_EMAIL && process.env.UBI_PASSWORD) {
      try {
        const playerNames = playersToFetch.map(p => p.name);
        const targetPlatform = playersToFetch[0].platform;

        const idResponse = await r6api.findByUsername(targetPlatform, playerNames);

        if (idResponse && idResponse.length > 0) {
          const ids = idResponse.map((p: any) => p.id);
          const [statsResponse, rankResponse, progressionResponse] = await Promise.all([
            r6api.getStats(targetPlatform, ids),
            r6api.getRanks(targetPlatform, ids),
            r6api.getProgression(targetPlatform, ids)
          ]);

          combinedData = ids.map((id: string) => {
            const profile = idResponse.find((p: any) => p.id === id);
            const playerStats = statsResponse[0] ? statsResponse[0][id] : (statsResponse[id] || {});
            const playerRank = rankResponse[0] ? rankResponse[0][id] : (rankResponse[id] || {});
            const playerProgression = progressionResponse[0] ? progressionResponse[0][id] : (progressionResponse[id] || {});

            const pvp = playerStats.general?.pvp || {};
            const kills = pvp.kills || 0;
            const deaths = pvp.deaths || 1;
            const wins = pvp.wins || 0;
            const losses = pvp.losses || 1;
            const timePlayedSeconds = pvp.playtime || 0;
            const currentRank = playerRank.current || {};

            return {
              username: profile.username,
              platform: profile.platform,
              avatar: profile.avatar?.['256'] || null,
              level: playerProgression.level || 0,
              kd: (kills / deaths).toFixed(2),
              wl: ((wins / (wins + losses)) * 100).toFixed(1),
              rank: currentRank.name || 'Unranked',
              mmr: currentRank.mmr || 0,
              matches: wins + losses,
              timePlayed: Math.round(timePlayedSeconds / 3600) + 'h',
              headshotPct: 0
            };
          });
        }
      } catch (e: any) {
        console.error('r6api.js failed, trying fallback...', e);
        const fs = require('fs');
        fs.appendFileSync('error_log.txt', `r6api.js Error: ${e.message}\n`);
      }
    } else {
      const fs = require('fs');
      fs.appendFileSync('error_log.txt', `Skipping r6api.js: No credentials\n`);
    }

    // If r6api.js failed or credentials missing, try Puppeteer
    if (!combinedData && username) {
      console.log('Attempting Puppeteer scrape...');
      try {
        const scrapedData = await scrapeR6Stats(username, platform);
        combinedData = [scrapedData];
      } catch (e: any) {
        console.error('Puppeteer scrape failed', e);
        const fs = require('fs');
        fs.appendFileSync('error_log.txt', `Puppeteer Error: ${e.message}\n`);
      }
    }

    if (!combinedData) {
      throw new Error('All fetch methods failed');
    }

    // Update cache
    cache[cacheKey] = {
      data: combinedData,
      timestamp: Date.now()
    };

    return NextResponse.json(combinedData);

  } catch (error: any) {
    const fs = require('fs');
    const logMessage = `
    Time: ${new Date().toISOString()}
    Error: ${error.message}
    Stack: ${error.stack}
    Env Email Present: ${!!process.env.UBI_EMAIL}
    Env Password Present: ${!!process.env.UBI_PASSWORD}
    ---------------------------------------------------
    `;
    try {
      fs.appendFileSync('error_log.txt', logMessage);
    } catch (e) {
      console.error('Failed to write to error log', e);
    }

    console.error('Error fetching R6 stats:', error);

    console.log('Falling back to mock data');
    const mockData = [{
      username: 'MockUser',
      platform: 'uplay',
      avatar: null,
      level: 150,
      kd: '1.20',
      wl: '55.0',
      rank: 'Platinum',
      mmr: 3500,
      matches: 100,
      timePlayed: '50h',
      headshotPct: 45
    }];

    return NextResponse.json(mockData);
  }
}
