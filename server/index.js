const express = require ('express');
const app =express();
const cors=require('cors')
const chats = require('./data/data')
const dotenv=require('dotenv');
const connectdb =require("./config/db");
const userRoutes= require("./routes/userRoutes")
dotenv.config();

connectdb();
app.use(cors());
app.use(express.json())
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("Hello");
})
app.get("/api/chats",(req,res)=>{
    console.log("reached");
    
    res.send(chats);
})


app.get("/api/chats/:id",(req,res)=>{
    const id = req.params.id;
    const chat= chats.find(c=>c._id === id);

    res.send(chat);
})
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App listening ....${port}`);
    
})