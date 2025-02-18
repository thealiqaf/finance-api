import express from "express";
import { createTransaction, getTransactions, deleteTransaction, updateTransaction } from "../controllers/Transaction";
import protect from "../middleware/auth";

const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);
router.delete('/:id', protect, deleteTransaction);
router.patch('/:id', protect, updateTransaction);

export default router;