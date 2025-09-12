import { Router } from "express";
import { getItem, getItems } from "../controllers/stocks.controller";

const router = Router();

console.log("=== ROUTE FILE LOADED ===");

// GET
router.get("/", (req, res, next) => {
  console.log("*** ROUTE HIT: GET / all_stocks (getItems) ***");
  getItems(req, res);
});

router.get("/:symbol", (req, res, next) => {
  console.log(`*** ROUTE HIT: GET /${req.params.symbol} (getItem) ***`);
  getItem(req, res);
});

export default router;
