import { Stocks, fetchStocks } from "./stock-fetch";

// get top 5 gainers by sorting the stocks by change difference
export const getTopGain = async (): Promise<Stocks[]> => {
  const data = await fetchStocks();
  return data
    .sort((a, b) => {
      const aLatest = a.historical?.[0];
      const aPrev = a.historical?.[1];
      const bLatest = b.historical?.[0];
      const bPrev = b.historical?.[1];
      const aChange = aLatest && aPrev ? aLatest.close - aPrev.close : 0;
      const bChange = bLatest && bPrev ? bLatest.close - bPrev.close : 0;
      return bChange - aChange;
    })
    .slice(0, 5);
};

// get top 6 stocks by sorting the stocks by latest close price
export const getTopClose = async (): Promise<Stocks[]> => {
  const data = await fetchStocks();
  return data
    .sort((a, b) => {
      const aLatest = a.historical?.[0];
      const bLatest = b.historical?.[0];
      return aLatest && bLatest ? bLatest.close - aLatest.close : 0;
    })
    .slice(0, 6);
};
