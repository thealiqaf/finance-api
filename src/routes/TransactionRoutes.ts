import express from "express";
import { addTransaction, getTransaction } from "../controllers/Transaction";

const router = express.Router();

router.post('/transactions', addTransaction);
router.get('/transactions/:userId', getTransaction);

export default router;