import { Request, Response } from "express";
import Transaction from "../models/Transaction";

export const addTransaction = async (req:Request, res:Response) => {
    const { userId, type, category, amount } = req.body;
    try {
        const transaction = new Transaction({ userId, type, category, amount });
        await transaction.save();
        res.status(201).json({
            message: 'Transaction added'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding transaction'});
      }
};

export const getTransaction = async (req:Request, res:Response) => {
    const { userId } = req.params;
    try {
        const transaction = await Transaction.find({ userId });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({
            message: 'Error adding transaction'});
      }
};