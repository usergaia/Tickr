import mongoose from "mongoose";
import dotenv from "dotenv";
import { fetchAndStoreAV } from "./util/fetch-av";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // await fetchAndStoreAV();
    console.log("Stock data fetched and stored successfully.");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
