export type HistoricalPrice = {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
};

export type Stocks = {
  _id: string;
  symbol: string;
  name?: string;
  stock_name?: string;
  historical: HistoricalPrice[];
  lastRefreshed?: string;
  timezone?: string;
};

// client-side cache to prevent excessive API calls
let cache: { data: Stocks[]; timestamp: number } | null = null;
let lastCallTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
const MIN_CALL_INTERVAL = 10000; // 10s min between API calls

// toggle between public server and local server
const getApiServer = () => {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.PUBLIC_SERVER_URL
      ? process.env.PUBLIC_SERVER_URL
      : "http://localhost:1000") // fallback for local dev
  );
};

const API_SERVER = getApiServer();

// fetch all stocks
export async function fetchStocks(): Promise<Stocks[]> {
  const timestamp = new Date().toISOString();
  const stack =
    new Error().stack?.split("\n").slice(1, 4).join("\n") || "Unknown";
  console.log(`[${timestamp}] fetchStocks() called from:\n${stack}`);

  // check client-side cache first
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log(`[${timestamp}] Using client-side cache - avoiding API call`);
    return cache.data;
  }

  // rate limiting: prevent calls too close together
  const now = Date.now();
  if (now - lastCallTime < MIN_CALL_INTERVAL && cache?.data) {
    console.log(`[${timestamp}] Rate limited - using cache`);
    return cache.data;
  }
  lastCallTime = now;

  try {
    console.log(`[${timestamp}] Making API call to server`);
    console.log(`API_SERVER: ${API_SERVER}`);
    const res = await fetch(`${API_SERVER}/stocks`);
    if (!res.ok) {
      throw new Error("Failed to fetch stocks");
    }
    const data = await res.json();

    // cache the result
    cache = {
      data,
      timestamp: Date.now(),
    };

    return data;
  } catch (error) {
    console.error("API Server unavailable:", error);
    throw new Error("API Server is unavailable.");
  }
}

// fetch one stock by symbol
export async function fetchOne(symbol: string): Promise<Stocks | null> {
  try {
    const res = await fetch(`${API_SERVER}/stocks/${symbol}`);
    if (!res.ok) {
      throw new Error("Failed to fetch stock");
    }
    return res.json();
  } catch (error) {
    console.error("API Server unavailable:", error);
    throw new Error("API Server is unavailable.");
  }
}
