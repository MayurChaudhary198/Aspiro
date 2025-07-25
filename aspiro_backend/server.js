const express = require("express");
const app = express();

const dotenv = require('dotenv');
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require("./db");

const authRoutes = require('./routes/authRoutes');

//DB Connection
connectDB();

//Middleware
app.use(express.json());

//Routes
app.get("/",(req,res)=>{
    res.send("Hello From Server");
});

app.use('/api', authRoutes);







app.listen(port,()=>{
    console.log(`✅ Server is listening on the port ${port}`);
});