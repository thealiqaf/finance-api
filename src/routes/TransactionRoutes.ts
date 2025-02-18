import express from "express";
import { createTransaction, getTransactions, deleteTransaction, updateTransaction } from "../controllers/TransactionController";
import { getMonthlyReport } from "../controllers/ReportController";
import protect from "../middleware/auth";

const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);
router.delete('/:id', protect, deleteTransaction);
router.patch('/:id', protect, updateTransaction);
router.get('/reports/monthly/:userId/:year/:month', protect, getMonthlyReport);

export default router;