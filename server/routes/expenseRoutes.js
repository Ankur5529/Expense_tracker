import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Create a new expense
router.post("/", async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const expense = await Expense.create({ title, amount, category, date });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Error creating expense", error: error.message });
    }
});

// Read all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
});

// Update an expense
router.put("/:id", async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const updated = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, category, date },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
});

export default router;