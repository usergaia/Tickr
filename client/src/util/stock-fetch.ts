export type HistoricalPrice = {
  date: string;
  close: number;
};

// will add more properties after updating db
export type Stocks = {
  _id: string;
  symbol: string;
  name?: string;
  stock_name?: string;
  historical: HistoricalPrice[];
};

// fetch all stocks
export async function fetchStocks(): Promise<Stocks[]> {
  const res = await fetch("http://localhost:2000/api/items");
  return res.json();
}

// fetch one stock by symbol
export async function fetchOne(symbol: string): Promise<Stocks> {
  const res = await fetch(`http://localhost:2000/api/items/${symbol}`);
  return res.json();
}
