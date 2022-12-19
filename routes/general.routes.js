import express from "express";
import { getDashboardSats } from "../controllers/general.js";

const router = express.Router();

router.get("/dashboard", getDashboardSats);

export default router;
