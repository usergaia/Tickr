import { Router } from "express";
import {
  getItem,
  getItems,
  postItem,
  updItem,
  delItem,
} from "../controllers/stocks.controller";

const router = Router();

// GET
router.get("/", getItems);
router.get("/:symbol", getItem);

// POST
router.post("/", postItem);

// PUT
router.put("/:symbol", updItem);

// DELETE
router.delete("/:symbol", delItem);

export default router;
