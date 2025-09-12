import { Stocks } from "./stock-fetch";

// use the passed data instead of fetching
export const getTopGain = (data: Stocks[]): Stocks[] => {
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

export const getTopClose = (data: Stocks[]): Stocks[] => {
  return data
    .sort((a, b) => {
      const aLatest = a.historical?.[0];
      const bLatest = b.historical?.[0];
      return aLatest && bLatest ? bLatest.close - aLatest.close : 0;
    })
    .slice(0, 6);
};
