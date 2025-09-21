import axios from "axios";
import StockModel, { HistoricalPrice } from "../models/stocks.model";
import dotenv from "dotenv";
dotenv.config();

// simple sleep utility for throttling API calls
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAndStoreAV() {
  const stockSymbols = [
    "AAPL", // Apple
    "ADBE", // Adobe
    "AMZN", // Amazon
    "AVGO", // Broadcom
    "CRM", // Salesforce
    "CSCO", // Cisco
    "DDOG", // Datadog
    "GOOGL", // Google
    "IBM", // IBM
    "INTU", // Intuit
    "META", // Meta
    "MSFT", // Microsoft
    "NET", // Cloudflare
    "NOW", // ServiceNow
    "NVDA", // Nvidia
    "ORCL", // Oracle
    "PLTR", // Palantir
    "SAP", // SAP
    "SNOW", // Snowflake
    "WDAY", // Workday
  ];

  try {
    for (const stockSymbol of stockSymbols) {
      await fetchStocks(stockSymbol);
      console.log(`Stocks for ${stockSymbol} saved/updated (last 100 days).`);

      // delay to respect Alpha Vantage free tier limits (5 requests per min)
      await sleep(15000); // 15s → max 4 requests/min
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

async function fetchStocks(stockSymbol: string) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${process.env.AV_API}`;

  const response = await axios.get(url);
  const data = response.data;

  // --- handle API errors & rate limits ---
  if (data["Error Message"]) {
    console.error(
      `Alpha Vantage error for ${stockSymbol}:`,
      data["Error Message"],
    );
    return;
  }
  if (data["Note"]) {
    console.error(`Rate limit notice for ${stockSymbol}:`, data["Note"]);
    return;
  }
  if (!data["Meta Data"]) {
    console.error(`No Meta Data returned for ${stockSymbol}:`, data);
    return;
  }

  // --- extract metadata ---
  const meta = data["Meta Data"];
  const symbol = meta["2. Symbol"];
  const lastRefreshed = meta["3. Last Refreshed"];
  const timezone = meta["5. Time Zone"];
  if (!symbol || !lastRefreshed || !timezone) {
    console.error(`Invalid metadata for ${stockSymbol}:`, meta);
    return;
  }

  // --- extract time series data ---
  const seriesKey = Object.keys(data).find((k) => k.startsWith("Time Series"));
  if (!seriesKey) {
    console.error(`No Time Series found for ${stockSymbol}:`, data);
    return;
  }
  const timeSeries = data[seriesKey] as Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    }
  >;

  // --- format last 100 days ---
  const historical: HistoricalPrice[] = Object.entries(timeSeries)
    .map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"], 10),
    }))
    .sort((a, b) => b.date.localeCompare(a.date)) // latest first
    .slice(0, 100);

  // --- save to MongoDB ---
  await StockModel.updateOne(
    { symbol },
    { symbol, historical, lastRefreshed, timezone },
    { upsert: true },
  );
}
