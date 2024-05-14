const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { Expense } = require('./models/expenses.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://monisha309:monisha309@expense-tracker.rjgd6ri.mongodb.net/expense-tracker-db?retryWrites=true&w=majority&appName=expense-tracker')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/add-expense', async (req, res) => {
    try {
        await Expense.create({
            amount: req.body.amount,
            category: req.body.category,
            date: new Date().toISOString(),
            type: req.body.type 
        });
        res.status(201).json({
            status: "success",
            message: "entry created"
        });
    } catch (err) {
        console.error('Error creating expense:', err);
        res.status(500).json({
            status: "failure",
            message: "entry not created",
            error: err.message
        });
    }
});

app.get('/get-expenses', async (req, res) => {
    try {
        const expenseDetails = await Expense.find({});
        res.status(200).json(expenseDetails);
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.status(500).json({
            status: "failure",
            message: "could not fetch data",
            error: err.message
        });
    }
});

app.delete('/delete-expense/:id', async (req, res) => {
    try {
        const expenseEntry = await Expense.findByIdAndDelete(req.params.id);
        if (!expenseEntry) {
            return res.status(404).json({
                status: "failure",
                message: "entry not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "entry deleted"
        });
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({
            status: "failure",
            message: "could not delete entry",
            error: err.message
        });
    }
});

app.patch('/update-expense/:id', async (req, res) => {
    try {
        const expenseEntry = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                amount: req.body.amount,
                category: req.body.category,
                date: req.body.date,
                type: req.body.type
            },
            { new: true, runValidators: true }
        );
        if (!expenseEntry) {
            return res.status(404).json({
                status: "failure",
                message: "entry not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "entry updated"
        });
    } catch (err) {
        console.error('Error updating expense:', err);
        res.status(500).json({
            status: "failure",
            message: "could not update entry",
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
