import mongoose, { Schema, Document } from "mongoose";

// typeScript interface
export interface Stocks extends Document {
  symbol: string;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
  date: Date;
}

// schema
const StockSchema: Schema = new Schema({
  symbol: { type: String, required: [true, "Symbol is required"] },
  volume: { type: Number, required: [true, "Volume is required"] },
  open: { type: Number, required: [true, "Open price is required"] },
  high: { type: Number, required: [true, "High price is required"] },
  low: { type: Number, required: [true, "Low price is required"] },
  close: { type: Number, required: [true, "Close price is required"] },
  date: { type: Date, required: [true, "Date is required"] },
});

const StockModel = mongoose.model<Stocks>(
  "Stocks", //name
  StockSchema, // schema
  "daily_prices", // collection name
);

export default StockModel;
