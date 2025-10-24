import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchAndStoreAV } from "./util/fetch-av";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Optional: fetch once on startup (can be removed if you prefer)
    console.log("Running initial fetch on startup...");
    fetchAndStoreAV()
      .then(() => console.log("Initial fetch complete"))
      .catch((err) => console.error("Initial fetch error:", err));

    console.log(
      "Stock data fetch will be triggered by GitHub Actions at 5:00 AM Manila time daily",
    );
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
