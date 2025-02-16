import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes';
import transactionRoutes from './routes/TransactionRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', transactionRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});