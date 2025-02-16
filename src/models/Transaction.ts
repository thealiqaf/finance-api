import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    userId: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: Date;
}

const TransactionSchema: Schema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
   amount: { type: Number, required: true },
   date: { type: Date, default: Date.now }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);