import { Request, Response, RequestHandler } from "express";
import Transaction from "../models/Transaction";

interface AuthRequest extends Request {
  user?: any;
}

export const createTransaction: RequestHandler = async (req: AuthRequest, res: Response) => {
  const { type, amount, category, description } = req.body;

  if (!type || !amount || !category) {
    res.status(400).json({ message: "Fill all fields" });
    return;
  }

  try {
    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount,
      category,
      description,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in add transaction"});
  }
};

export const getTransactions: RequestHandler = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 0;
    const skip = (page - 1) * limit;

    const { category, type } = req.body;

    const filter: any = { userId: req.user.id };

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const transaction = await Transaction.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createAd: -1 });

      const totalTransactions = await Transaction.countDocuments(filter);

      const totalPage = Math.ceil(totalTransactions / limit);

      res.status(200).json({
        transaction,
        currentPage: page,
        totalPage,
        totalTransactions
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in get transaction" });
  }
};

export const deleteTransaction: RequestHandler = async (req: AuthRequest, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    if (transaction.userId.toString() !== req.user.id) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error in delete transaction"});
  }
};


export const updateTransaction: RequestHandler = async (req: AuthRequest, res: Response) => {
  const { type, amount, category, description } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    if (transaction.userId.toString() !== req.user.id) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error in update transaction"});
  }
};