// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/expenses', (req, res) => {                         //  '/expense' defines the path where the res inside it send to client , also used in postman
//   res.send('expensesss...')                                   // no 2 send response will appear
// //   req.send("hii")                                           // won't work coz of 2 res
// })

// // but others methods will work put, post, delete

// // app.get('/expenses', (req, res) => {                         
// //   res.send('expensesss...')                                   // this res wont work coz of 2 res
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
//   console.log("before using postman runn index.js brooo....")
// })


// // to check whether GET is working do to http://localhost:3000 -> console -> network -> reload -> press localhost -> request mode : GET







const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 8000             // if mentioned port is not available in that server then it will take available port in that server 

app.use(cors());
const Expense = require('./models/expenses')
mongoose.connect('mongodb+srv://monishak:monisha@expense-tracker.qa5zgel.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=expense-tracker',{
    useUnifiedTopology: true
})
app.use(express.json())              // allows only new entry



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });



// find all
app.get('/expenses', async(req,res)=>{
    try{
        const result = await Expense.find();
        res.send(result)
    }
    catch(err){
        next(err)
    }
})


// app.post('/expenses', async(req,res)=>{
//     res.send('<h1>hello</h1>')
// })

// find one
// app.get('/expenses/:id', async(req,res)=>{
//     console.log(req.params)
//     res.send(req.params)
// })


// find one
app.get('/expenses/:id', async(req,res)=>{
    try{
        const id = req.params.id
        const result = await Expense.findById(id)
        if(result)
            res.send(result)
        else
            res.send("no expense with that id")
    }
    catch(err){
        next(err)
    }
})


// delete
app.delete('/expenses/:id', async(req,res)=>{
    try{
        const id = req.params.id
        const result = await Expense.findByIdAndDelete(id)
        if(result)
            res.send(result)
        else
            res.send("no expense with that id")
    }
    catch(err){
        next(err)
    }
})

app.post('/expenses',async(req,res)=>{
    try{
        console.log(req.body)
        const newExpense = req.body
        await Expense.create(newExpense)
        res.send('created')
    }
    catch(err){
        next(err)
    }
})

//update

app.put('/expenses/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const updateObject = req.body
        const updatedObject = await Expense.findByIdAndUpdate(id,{$set:updateObject},{
            new: true
        })
        res.send(updatedObject)
    }
    catch(err){
        next(err)
    }
})



app.listen(port,()=>{
    console.log(`started listening to port ${port}`)
})
