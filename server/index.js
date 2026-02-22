import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log("Connected to MongoDB"); })
    .catch((err) => { console.error("Error connecting to MongoDB:", err); });

//Test route
app.get('/', (req, res) => {
    res.send("Expense Tracker API is running 🚀");
});

app.use('/api/expenses', expenseRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});