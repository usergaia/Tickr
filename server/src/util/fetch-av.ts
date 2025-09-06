import axios from "axios";
import StockModel, { HistoricalPrice } from "../models/stocks.model";
import dotenv from "dotenv";
dotenv.config();

export async function fetchAndStoreAV() {
  // const stockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
  const stockSymbols = ["IBM"]; //
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbols}&apikey=${process.env.AV_API}`,
  );
  const data = response.data;

  // extract symbol
  const meta = data["Meta Data"];
  const symbol = meta["2. Symbol"];

  // extract time series data
  const seriesKey = Object.keys(data).find((k) => k.startsWith("Time Series"));
  if (!seriesKey) throw new Error("No Time Series data found");
  const timeSeries = data[seriesKey];

  // extract close from time series
  type TimeSeriesClose = { "4. close": string };
  const timeSeriesTyped = timeSeries as Record<string, TimeSeriesClose>;

  // store last 30 days of data to db
  const historical: HistoricalPrice[] = Object.entries(timeSeriesTyped)
    .map(([date, values]) => ({
      date: date,
      close: parseFloat(values["4. close"]),
    }))
    .sort((a, b) => b.date.localeCompare(a.date)) // sort latest first
    .slice(0, 30);

  // draft for updating to db
  await StockModel.updateOne(
    { symbol },
    { symbol, historical },
    { upsert: true },
  );

  console.log(`✅ Stocks for ${symbol} saved/updated (last 30 days).`);
}
