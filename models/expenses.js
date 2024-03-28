const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    amount : { type: Number, required: true },
    desc : { type: String, required: true },
})

const Expense = mongoose.model('Expense',expenseSchema)
module.exports = Expense;