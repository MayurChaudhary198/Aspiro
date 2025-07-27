const express = require("express");
const app = express();

const dotenv = require('dotenv');
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require("./db");

//Middleware
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

const careerRoutes = require("./routes/careerRoutes");
app.use("/api/career", careerRoutes);

//DB Connection
connectDB();



//Routes
app.get("/",(req,res)=>{
    res.send("Hello From Server");
});









app.listen(port,()=>{
    console.log(`✅ Server is listening on the port ${port}`);
});