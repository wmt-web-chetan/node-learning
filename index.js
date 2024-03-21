import dotenv from "dotenv"
import express from "express"

const app=express();

dotenv.config()



app.get("/",(req,resp)=>{
    resp.send("hello world")
})

app.get("/user",(req,resp)=>{
    resp.send("<h1>name is chinmoy</h1>")
})

app.get("/login",(req,resp)=>{
    resp.send("you are login!!!")
})

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log("port is running")
})

