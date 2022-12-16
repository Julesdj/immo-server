import express from "express";
import { getProducts, getProductStats } from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/stats", getProductStats);

export default router;
