import dotenv from "dotenv";
import connectDB from "../db";
import { fetchAndStoreAV } from "../util/fetch-av";

dotenv.config();

async function run(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("Starting fetchAndStoreAV()");
    await fetchAndStoreAV();

    console.log("Fetch complete. Exiting.");
    process.exit(0);
  } catch (err: any) {
    console.error("Fetch script failed:", err);
    process.exit(1);
  }
}

run();
