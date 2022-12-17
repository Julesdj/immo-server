import express from "express";
import { getCustomers, getTransactions } from "../controllers/client.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/transactions", getTransactions);

export default router;
