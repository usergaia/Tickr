import axios from "axios";
import StockModel, { HistoricalPrice } from "../models/stocks.model";
import dotenv from "dotenv";
dotenv.config();

// simple sleep utility for throttling API calls
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAndStoreAV() {
  // limit the fetch to 12 symbols to reduce AlphaVantage quota usage with GitHub actions
  const stockSymbols = [
    "AAPL",
    "ADBE",
    "AMZN",
    "AVGO",
    "CRM",
    "CSCO",
    "DDOG",
    "GOOGL",
    "IBM",
    "INTU",
    "META",
    "MSFT",
  ];

  console.log(`Starting to fetch ${stockSymbols.length} symbols...`);

  try {
    for (let i = 0; i < stockSymbols.length; i++) {
      const stockSymbol = stockSymbols[i];

      const success = await fetchStocks(stockSymbol);

      if (!success) {
        console.log(
          `Rate limit hit at ${stockSymbol}, stopping batch processing`,
        );
        break; // Stop processing when rate limit is reached
      }

      console.log(`Stocks for ${stockSymbol} saved/updated (last 100 days).`);

      // Don't delay after the last symbol
      if (i < stockSymbols.length - 1) {
        console.log(
          `Waiting 20 seconds before next request... (${i + 1}/${stockSymbols.length} complete)`,
        );
        await sleep(20000); // Increased to 20s for safety
      }
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

async function fetchStocks(stockSymbol: string): Promise<boolean> {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${process.env.AV_API}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // --- handle API errors & rate limits ---
    if (data["Error Message"]) {
      console.error(
        `Alpha Vantage error for ${stockSymbol}:`,
        data["Error Message"],
      );
      return false;
    }

    if (data["Note"]) {
      console.error(`Rate limit notice for ${stockSymbol}:`, data["Note"]);
      return false;
    }

    // ADD THIS: Check for the "Information" field that contains rate limit messages
    if (data["Information"] && data["Information"].includes("rate limit")) {
      console.log(
        `Rate limit detected for ${stockSymbol}:`,
        data["Information"],
      );
      return false; // Signal to stop processing
    }

    if (!data["Meta Data"]) {
      console.error(`No Meta Data returned for ${stockSymbol}:`, data);
      return false;
    }

    // --- extract metadata ---
    const meta = data["Meta Data"];
    const symbol = meta["2. Symbol"];
    const lastRefreshed = meta["3. Last Refreshed"];
    const timezone = meta["5. Time Zone"];

    if (!symbol || !lastRefreshed || !timezone) {
      console.error(`Invalid metadata for ${stockSymbol}:`, meta);
      return false;
    }

    // --- extract time series data ---
    const seriesKey = Object.keys(data).find((k) =>
      k.startsWith("Time Series"),
    );
    if (!seriesKey) {
      console.error(`No Time Series found for ${stockSymbol}:`, data);
      return false;
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
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 100);

    // --- save to MongoDB ---
    await StockModel.updateOne(
      { symbol },
      { symbol, historical, lastRefreshed, timezone },
      { upsert: true },
    );

    return true; // Success
  } catch (error) {
    console.error(`Network error fetching ${stockSymbol}:`, error);
    return false;
  }
}
