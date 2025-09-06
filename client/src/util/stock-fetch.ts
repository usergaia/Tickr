export type Stocks = {
  _id?: string;
  symbol: string;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
  date: Date;
};

export async function fetchItems(): Promise<Stocks[]> {
  const res = await fetch("http://localhost:2000/api/items", {
    cache: "no-store",
  });
  return res.json();
}
