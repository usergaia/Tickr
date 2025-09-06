import { Router } from "express";
import { getItem, getItems, postItem, updItem, delItem } from "../controllers/item.controller";

const router = Router();

// GET
router.get("/", getItems);
router.get("/:id", getItem);

// POST
router.post("/", postItem);

// PUT
router.put("/:id", updItem);

// DELETE
router.delete("/:id", delItem);

export default router;
