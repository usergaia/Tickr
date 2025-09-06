export type HistoricalPrice = {
  date: string;
  close: number;
};

export type Stocks = {
  _id?: string;
  symbol: string;
  historical: HistoricalPrice[];
};

export async function fetchStocks(): Promise<Stocks[]> {
  const res = await fetch("http://localhost:2000/api/items");
  return res.json();
}
