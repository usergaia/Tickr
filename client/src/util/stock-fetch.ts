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

// fetch all stocks
export async function fetchStocks(): Promise<Stocks[]> {
  const res = await fetch("http://localhost:1000/stocks");
  return res.json();
}

// fetch one stock by symbol
export async function fetchOne(symbol: string): Promise<Stocks> {
  const res = await fetch(`http://localhost:1000/stocks/${symbol}`);
  return res.json();
}
