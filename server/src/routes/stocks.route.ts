import { Router } from "express";
import {
  getItem,
  getItems,
  // postItem,
  // updItem,
  // delItem,
} from "../controllers/stocks.controller";

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

// // POST
// router.post("/", postItem);

// // PUT
// router.put("/:symbol", updItem);

// // DELETE
// router.delete("/:symbol", delItem);

export default router;
