import { Request, Response } from "express";
import StockModel, { Stocks } from "../models/stocks.model";
import { redis } from "../redis";
import { fetchAndStoreAV } from "../util/fetch-av";

console.log("=== CONTROLLER FILE LOADED ===");

// GET all items
export const getItems = async (req: Request, res: Response): Promise<void> => {
  console.log("=== getItems API CALLED ===");

  try {
    const cacheKey = "all_stocks";
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // SCENARIO 1: CACHE EXIST
      console.log("CACHE HIT - Returning cached data");
      const items: Stocks[] =
        typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
      res.status(200).json(items);
    } else {
      // SCENARIO 2: NO CACHE
      console.log("CACHE MISS - Fetching from database");
      const items: Stocks[] = await StockModel.find().sort({ date: 1 });

      // cache the data (Upstash Redis set method; expiration set to 12 hrs)
      await redis.set(cacheKey, JSON.stringify(items), { ex: 43200 });
      console.log("Data stored in cache");

      res.status(200).json(items);
    }
  } catch (error: any) {
    console.error(" ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }

  console.log("=== getItems COMPLETED ===");
};

// GET single item by symbol
export const getItem = async (req: Request, res: Response): Promise<void> => {
  const { symbol } = req.params;
  console.log(` === getItem API CALLED for ${symbol} ===`);

  try {
    const cacheKey = `stock_${symbol}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // SCENARIO 1: CACHE HIT
      console.log(` CACHE HIT for ${symbol} - Returning cached data`);
      const item: Stocks | null =
        typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
      res.status(200).json(item);
    } else {
      // SCENARIO 2: CACHE MISS
      console.log(` CACHE MISS for ${symbol} - Fetching from database`);
      const item: Stocks | null = await StockModel.findOne({ symbol });
      if (!item) {
        console.log(` Stock ${symbol} not found in database`);
        res
          .status(404)
          .json({ message: `No item found with symbol ${symbol}` });
        return;
      }
      res.status(200).json(item);
      // Cache the data (Upstash Redis set method with expiration)
      await redis.set(cacheKey, JSON.stringify(item), { ex: 100 });
      console.log(`Data for ${symbol} stored in cache`);
    }
  } catch (error: any) {
    console.error(` ERROR for ${symbol}:`, error.message);
    res.status(500).json({ message: error.message });
  }

  console.log(`=== getItem for ${symbol} COMPLETED ===`);
};

// POST trigger fetch - protected by AV_API key
export const triggerFetch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("=== triggerFetch API CALLED ===");

  try {
    // Verify API key from header
    const apiKey = req.headers["x-api-key"] || req.headers["authorization"];
    if (!apiKey || apiKey !== process.env.AV_API) {
      console.log("UNAUTHORIZED - Invalid or missing API key");
      res.status(401).json({ message: "Unauthorized: Invalid API key" });
      return;
    }

    console.log("API key verified - Starting fetch...");
    await fetchAndStoreAV();

    // Clear all stock caches after successful fetch
    console.log("Clearing stock caches...");
    await redis.del("all_stocks");

    console.log("Fetch completed successfully");
    res.status(200).json({
      message: "Stock data fetched and stored successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("ERROR in triggerFetch:", error.message);
    res.status(500).json({
      message: "Failed to fetch stock data",
      error: error.message,
    });
  }

  console.log("=== triggerFetch COMPLETED ===");
};
