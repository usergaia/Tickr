import axios from "axios";
import StockModel, { HistoricalPrice } from "../models/stocks.model";
import dotenv from "dotenv";
dotenv.config();

export async function fetchAndStoreAV() {
  const stockSymbols = [
    "AAPL", // Apple
    "MSFT", // Microsoft
    "GOOGL", // Google
    "AMZN", // Amazon
    "NVDA", // Nvidia
    "META", // Meta Platforms (Facebook)
    "ORCL", // Oracle
    "IBM", // IBM
    "CRM", // Salesforce
    "ADBE", // Adobe
    "INTU", // Intuit
    "CSCO", // Cisco
    "SAP", // SAP
    "NOW", // ServiceNow
    "SNOW", // Snowflake
    "PLTR", // Palantir
    "WDAY", // Workday
    "AVGO", // Broadcom
    "NET", // Cloudflare
    "DDOG", // Datadog
  ];
  try {
    for (const stockSymbol of stockSymbols) {
      await fetchStocks(stockSymbol);
      console.log(`Stocks for ${stockSymbol} saved/updated (last 30 days).`);
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return;
  }
}

async function fetchStocks(stockSymbol: string) {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${process.env.AV_API}`,
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

  await StockModel.updateOne(
    { symbol },
    { symbol, historical },
    { upsert: true },
  );
}
