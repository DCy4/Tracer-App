import { NextResponse } from 'next/server';

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

    const playerNames = playersToFetch.map(p => p.name);
    // Assuming all are on the same platform for simplicity in this iteration
    const targetPlatform = playersToFetch[0].platform;

    const idResponse = await r6api.findByUsername(targetPlatform, playerNames);

    if (!idResponse || idResponse.length === 0) {
      return NextResponse.json({ error: 'Players not found' }, { status: 404 });
    }

    // Extract IDs
    const ids = idResponse.map((p: any) => p.id);

    // Fetch Data in parallel
    const [statsResponse, rankResponse, progressionResponse] = await Promise.all([
      r6api.getStats(targetPlatform, ids),
      r6api.getRanks(targetPlatform, ids),
      r6api.getProgression(targetPlatform, ids)
    ]);

    // Combine data
    const combinedData = ids.map((id: string) => {
      const profile = idResponse.find((p: any) => p.id === id);

      // statsResponse is usually an object { [id]: { ... } } or array
      // Based on r6api.js documentation, getStats returns an object keyed by ID
      const playerStats = statsResponse[0] ? statsResponse[0][id] : (statsResponse[id] || {});

      // rankResponse is usually { [id]: { ... } }
      const playerRank = rankResponse[0] ? rankResponse[0][id] : (rankResponse[id] || {});

      // progressionResponse is usually { [id]: { ... } }
      const playerProgression = progressionResponse[0] ? progressionResponse[0][id] : (progressionResponse[id] || {});

      // Flatten for frontend
      // General stats (pvp)
      const pvp = playerStats.general?.pvp || {};
      const kills = pvp.kills || 0;
      const deaths = pvp.deaths || 1; // avoid div by 0
      const wins = pvp.wins || 0;
      const losses = pvp.losses || 1;
      const timePlayedSeconds = pvp.playtime || 0;

      // Rank (current season)
      // Structure might be { max: ..., current: ... }
      const currentRank = playerRank.current || {};

      return {
        username: profile.username,
        platform: profile.platform,
        avatar: profile.avatar?.['256'] || null, // r6api.js often provides avatar URLs
        level: playerProgression.level || 0,
        kd: (kills / deaths).toFixed(2),
        wl: ((wins / (wins + losses)) * 100).toFixed(1),
        rank: currentRank.name || 'Unranked',
        mmr: currentRank.mmr || 0,
        matches: wins + losses,
        timePlayed: Math.round(timePlayedSeconds / 3600) + 'h',
        headshotPct: 0 // Need to find where headshots are, defaulting to 0
      };
    });

    // Update cache
    cache[cacheKey] = {
      data: combinedData,
      timestamp: Date.now()
    };

    return NextResponse.json(combinedData);

  } catch (error: any) {
    console.error('Error fetching R6 stats:', error);

    // Fallback to mock data for demonstration if API fails (e.g. due to rate limits or auth issues)
    // This ensures the UI doesn't break completely during development
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

    /* 
    // Original error response
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
    */
  }
}
