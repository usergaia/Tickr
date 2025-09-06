import { Request, Response } from "express";
import ItemModel, { IItem } from "../models/item.model";


// GET all items
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items: IItem[] = await ItemModel.find().sort({ age: 1 });
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET single item by ID
export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item: IItem | null = await ItemModel.findById(id);
    if (!item) {
      res.status(404).json({ message: `No item found with ID ${id}` });
      return;
    }
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new item
export const postItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item: IItem = await ItemModel.create(req.body);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update item
export const updItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findByIdAndUpdate(id, req.body, { new: true });
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
    const item = await ItemModel.findByIdAndDelete(id);
    if (!item) {
      res.status(404).json({ message: `Cannot find any item with ID ${id}` });
      return;
    }
    res.status(200).json({ message: "Item deleted successfully", item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
