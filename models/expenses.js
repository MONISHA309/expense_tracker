// models/expenses.js

const mongoose = require('mongoose')

const expenseTrackerSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: String
    },
    type: {
        type: String, // 'income' or 'expense'
        enum: ['income', 'expense'], // Only allows 'income' or 'expense' as values
        required: true // Make it a required field
    }
})

const Expense = mongoose.model('expensedetails', expenseTrackerSchema)

module.exports = { Expense }
