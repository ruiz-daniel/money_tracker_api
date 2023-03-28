const express = require('express');
require('dotenv').config({ path: './.env' })
const cors = require('cors')
const app = express();
const PORT = 3002;
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use(cors())

const { connectDB } = require('./mongodb')
connectDB()