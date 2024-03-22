// require("dotenv").dotenv.config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/noteRoutes");

const mongoose = require("mongoose");

const cors = require("cors");



const app=express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(`HTTP Method: ${req.method} , URL: ${req.url}`);
    next();
});

app.use("/users",userRouter);
app.use("/note",notesRouter);

app.get("/",(req,res)=>{
    res.send("Notes API-Develop By Devajit Patar");
});

console.log(process.env.SECRET_KEY);

mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            app.listen(PORT,()=>{
                console.log(`Server started at http://localhost:${PORT}`);
            });
            console.log("MongoDB Connected")
        })
        .catch((err)=>{console.log("MongoDB Error:",err)}); 


