import "dotenv/config";
import { checkHandleAvailability } from "./services/handle.service.js";

// get handle from terminal args
const handle = process.argv[2];

if (!handle) {
  console.error("Usage: node index.js <handle>");
  process.exit(1);
}

async function run() {
  try {
    const result = await checkHandleAvailability(handle);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Failed to check handle:");
    console.error(err.message);
  }
}

run();
