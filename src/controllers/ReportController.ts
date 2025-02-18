import { Request, Response, RequestHandler } from "express";
import Transaction from "../models/Transaction";

interface AuthRequest extends Request {
  user?: any;
}

export const getMonthlyReport: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, year, month } = req.params;

  if (!userId || !year || !month) {
    res.status(400).json({ message: "Missing required parameters" });
    return;
  }

  const parsedYear = parseInt(year);
  const parsedMonth = parseInt(month);

  if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    res.status(400).json({ message: "Invalid year or month" });
    return;
  }

  try {
    const startDate = new Date(parsedYear, parsedMonth - 1, 1);
    const endDate = new Date(parsedYear, parsedMonth, 0);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categories: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }

      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }

      categories[transaction.category] += transaction.amount;
    });

    const report = {
      totalIncome,
      totalExpense,
      netSaving: totalIncome - totalExpense,
      categories,
    };

    res.status(200).json(report);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
     res.status(500).json({ message: "Server error", error: error });
     return;
    }
   res.status(500).json({ message: "Server error" });
   return;
  }
};