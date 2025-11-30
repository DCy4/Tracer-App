const r6apiModule = require('r6api.js');
const email = 'davidczjobs@gmail.com';
const password = 'Ubihard2@';

const R6API = r6apiModule.default || r6apiModule;
const r6api = new R6API({ email, password });

async function run() {
  try {
    const username = 'Spoit';
    const platform = 'uplay';

    console.log('Logging in...');
    const idResponse = await r6api.findByUsername(platform, username);
    console.log('ID Response:', JSON.stringify(idResponse, null, 2));
    
    if (idResponse[0]) {
        const id = idResponse[0].id;
        // console.log('Fetching stats...');
        // const stats = await r6api.getStats(platform, id);
        // console.log('Stats Response:', JSON.stringify(stats, null, 2));

        console.log('Fetching Rank...');
        const rank = await r6api.getRanks(platform, id);
        console.log('Rank Response:', JSON.stringify(rank, null, 2));

        console.log('Fetching Progression...');
        const progression = await r6api.getProgression(platform, id);
        console.log('Progression Response:', JSON.stringify(progression, null, 2));
    } else {
        console.log('Player not found');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

run();
