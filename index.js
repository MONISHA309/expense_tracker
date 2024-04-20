const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./models/expenses.js')
/** 
 * Expense Tracker
 * 
 * Adding a new expense -> /add-expense
 * post : expenses details
 * 
 * displaying existing records -> /get-expenses
 * get
 * 
 * delete an expense -> /delete-expense
 * delete : id of the entry
 * 
 * updating an existing an one -> update-expense
 * patch : id of the entry, expenses details
*/

/**
 * Database Schema
 * amount, category, date
 */

/**
 * 200 - ok
 * 201 - created
 * 401 - unauthorized
 * 404 - page not found
 * 500 - internal server error
 */

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb+srv://monisha309:monisha309@expense-tracker.jau9mxu.mongodb.net/?retryWrites=true&w=majority&appName=Expense-Tracker')
        

// index.js

app.post('/add-expense', function(request, response) {
    Expense.create({
        amount: request.body.amount,
        category: request.body.category,
        date: new Date().toISOString(),
        type: request.body.type // Add the transaction type to the database
    }, function(error, result) {
        if (error) {
            response.status(500).json({
                status: "failure",
                message: "entry not created",
                error: error
            });
        } else {
            response.status(201).json({
                status: "success",
                message: "entry created"
            });
        }
    });
});


app.get('/get-expenses', function(request, response) {
    Expense.find({}, function(error, expenseDetails) {
        if (error) {
            response.status(500).json({
                status: "failure",
                message: "could not fetch data",
                error: error
            });
        } else {
            response.status(200).json(expenseDetails);
        }
    });
});


// localhost:8000/delete-expense/65efdf58a22a20e156658094
app.delete('/delete-expense/:id', function(request, response) {
    Expense.findById(request.params.id, function(error, expenseEntry) {
        if (error) {
            response.status(500).json({
                status: "failure",
                message: "could not find entry",
                error: error
            });
        } else {
            if (expenseEntry) {
                Expense.findByIdAndDelete(request.params.id, function(err) {
                    if (err) {
                        response.status(500).json({
                            status: "failure",
                            message: "could not delete entry",
                            error: err
                        });
                    } else {
                        response.status(200).json({
                            status: "success",
                            message: "entry deleted"
                        });
                    }
                });
            } else {
                response.status(404).json({
                    status: "failure",
                    message: "entry not found"
                });
            }
        }
    });
});


app.patch('/update-expense/:id', function(request, response) {
    Expense.findById(request.params.id, function(error, expenseEntry) {
        if (error) {
            response.status(500).json({
                status: "failure",
                message: "could not find entry",
                error: error
            });
        } else {
            if (expenseEntry) {
                expenseEntry.updateOne({
                    "amount": request.body.amount,
                    "category": request.body.category,
                    "date": request.body.date
                }, function(err) {
                    if (err) {
                        response.status(500).json({
                            status: "failure",
                            message: "could not update entry",
                            error: err
                        });
                    } else {
                        response.status(200).json({
                            status: "success",
                            message: "entry updated"
                        });
                    }
                });
            } else {
                response.status(404).json({
                    status: "failure",
                    message: "entry not found"
                });
            }
        }
    });
});

