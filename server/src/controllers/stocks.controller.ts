import { Request, Response } from "express";
import StockModel, { Stocks } from "../models/stocks.model";

// GET all items
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items: Stocks[] = await StockModel.find().sort({ date: 1 });
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET single item by symbol
export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol } = req.params;
    const item: Stocks | null = await StockModel.findOne({ symbol });
    if (!item) {
      res.status(404).json({ message: `No item found with symbol ${symbol}` });
      return;
    }
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UNUSED - WILL DECIDE WHETHER TO KEEP OR DELETE AFTER FINISHING MORE IMPORTANT TASKS
// POST create new item
export const postItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item: Stocks = await StockModel.create(req.body);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update item
export const updItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await StockModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!item) {
      res.status(404).json({ message: `Cannot find any item with ID ${id}` });
      return;
    }
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE item
export const delItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await StockModel.findByIdAndDelete(id);
    if (!item) {
      res.status(404).json({ message: `Cannot find any item with ID ${id}` });
      return;
    }
    res.status(200).json({ message: "Item deleted successfully", item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
