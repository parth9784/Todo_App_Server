const express=require("express")
require("dotenv").config()
const app=express()
const dbconnect=require("./config/database")
const routes=require("./routes/Routes")
const cors=require("cors")
dbconnect()
app.use(cors())
app.use(express.json())
app.use("",routes);

app.get("/",(req,res)=>{
    res.send("<h1>This is Todo App API Developed By Parth Dadhich..</h1>")
})
app.listen(process.env.PORT,()=>{
    console.log("Server Started....")
})