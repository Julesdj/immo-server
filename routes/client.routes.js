import express from "express";
import { getCustomers } from "../controllers/client.js";

const router = express.Router();

router.get("/", getCustomers);

export default router;
