const express = require('express');
require('dotenv').config({ path: './.env' })
const cors = require('cors')
const app = express();
const PORT = 3002;
const createError = require('http-errors')

const usersRouter = require('./routes/users')
// app.use('/users', usersRouter)


  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRouter)



const { connectDB } = require('./mongodb')
connectDB()