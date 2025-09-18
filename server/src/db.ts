import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchAndStoreAV } from "./util/fetch-av";
import cron from "node-cron";
import moment from "moment-timezone";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await fetchAndStoreAV(); // uncomment if you wanna fetch manually

    // schedule daily fetch at 5am Asia/Manila time
    cron.schedule(
      "0 5 * * *",
      () => {
        const now = moment().tz("Asia/Manila");
        if (now.hour() === 5) {
          fetchAndStoreAV()
            .then(() => console.log("scheduled data fetch complete"))
            .catch((err) => console.error("Fetch error:", err));
        }
      },
      {
        timezone: "Asia/Manila",
      },
    );
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
