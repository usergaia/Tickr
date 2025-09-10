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
  // const stockSymbols = ["IBM"]; // for testing
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

  // extract metadata properties
  const meta = data["Meta Data"];
  const symbol = meta["2. Symbol"];
  const lastRefreshed = meta["3. Last Refreshed"];
  const timezone = meta["5. Time Zone"];
  if (!symbol || !lastRefreshed || !timezone)
    throw new Error("Invalid metadata from API");

  // extract time series data
  const seriesKey = Object.keys(data).find((k) => k.startsWith("Time Series"));
  if (!seriesKey) throw new Error("No Time Series data found");
  const timeSeries = data[seriesKey];

  // extract ohlcv from time series
  type TimeSeriesData = {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
  const timeSeriesTyped = timeSeries as Record<string, TimeSeriesData>;

  // store last 30 days of data to db
  const historical: HistoricalPrice[] = Object.entries(timeSeriesTyped)
    .map(([date, values]) => ({
      date: date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }))
    .sort((a, b) => b.date.localeCompare(a.date)) // sort latest first
    .slice(0, 30);

  await StockModel.updateOne(
    { symbol },
    { symbol, historical, lastRefreshed, timezone },
    { upsert: true },
  );
}
