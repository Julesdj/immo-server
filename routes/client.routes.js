import express from "express";
import {
    getCustomers,
    getTransactions,
    getgeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getgeography);

export default router;
