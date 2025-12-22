import { isTikTokHandleAvailable } from '../src/clients/tiktok.client.js';

async function test() {
  const username = process.argv[2];

  const result = await isTikTokHandleAvailable(username);
  
  if (result === true) {
    console.log(`@${username} is AVAILABLE`);
  } else if (result === false) {
    console.log(`@${username} is TAKEN`);
  } else {
    console.log(`Could not determine availability for @${username}`);
  }
}

test().catch(console.error);