import mongoose, { Schema, Document } from "mongoose";

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Stocks extends Document {
  symbol: string;
  historical: HistoricalPrice[];
  lastRefreshed?: string;
  timezone?: string;
}

// Schema
const StockSchema: Schema = new Schema({
  symbol: {
    type: String,
    required: [true, "Symbol is required"],
    unique: true,
  },
  historical: {
    type: [
      {
        date: { type: String, required: [true, "Date is required"] },
        open: { type: Number, required: [true, "Open price is required"] },
        high: { type: Number, required: [true, "High price is required"] },
        low: { type: Number, required: [true, "Low price is required"] },
        close: { type: Number, required: [true, "Close price is required"] },
        volume: { type: Number, required: [true, "Volume is required"] },
      },
    ],
    required: [true, "Historical data is required"],
  },
  lastRefreshed: { type: String },
  timezone: { type: String },
});

const StockModel = mongoose.model<Stocks>(
  "Stocks", // model name
  StockSchema, // schema
  "daily_prices", // collection name
);

export default StockModel;
