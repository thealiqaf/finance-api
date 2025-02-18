import express from "express";
import { getMonthlyReport } from "../controllers/ReportController";
import protect from "../middleware/auth";

const router = express.Router();

router.get('/reports/monthly/:userId/:year/:month', protect, getMonthlyReport);

export default router;