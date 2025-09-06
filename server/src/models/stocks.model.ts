import mongoose, { Schema, Document } from "mongoose";

export interface HistoricalPrice {
  date: string;
  close: number;
}

export interface Stocks extends Document {
  symbol: string;
  historical: HistoricalPrice[];
}

// Schema
const StockSchema: Schema = new Schema({
  symbol: {
    type: String,
    required: [true, "Symbol is required"],
    unique: true,
  },
  historical: [
    {
      date: { type: String, required: true },
      close: { type: Number, required: true },
    },
  ],
});

const StockModel = mongoose.model<Stocks>(
  "Stocks", // model name
  StockSchema, // schema
  "daily_prices", // collection name
);

export default StockModel;
