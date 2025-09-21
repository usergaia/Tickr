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

    // fetch once on startup
    console.log("Running initial fetch on startup...");
    fetchAndStoreAV()
      .then(() => console.log("Initial fetch complete"))
      .catch((err) => console.error("Initial fetch error:", err));

    // schedule daily fetch
    try {
      const task = cron.schedule(
        "0 5 * * *",
        () => {
          const now = moment().tz("Asia/Manila");
          console.log(
            `Cron job triggered at: ${now.format("YYYY-MM-DD HH:mm:ss")} Manila time`,
          );
          fetchAndStoreAV()
            .then(() => console.log("Scheduled data fetch complete"))
            .catch((err) => console.error("Fetch error:", err));
        },
        { timezone: "Asia/Manila" },
      );

      if (task) {
        console.log("Cron job registered for 5:00 AM Manila time daily");
      } else {
        console.error("Cron job failed to register");
      }
    } catch (err) {
      console.error("Error while scheduling cron:", err);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
