const express = require ('express');
const app =express();
const chats = require('./data/data')
const dotenv=require('dotenv');
dotenv.config();
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.get("/api/chats",(req,res)=>{
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