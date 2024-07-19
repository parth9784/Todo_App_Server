const express=require("express")
require("dotenv").config()
const app=express()
const dbconnect=require("./config/database")
const routes=require("./routes/Routes")
dbconnect()
app.use(express.json())
app.use("",routes);

app.get("/",(req,res)=>{
    res.send("<h1>This is Home page...</h1>")
})
app.listen(process.env.PORT,()=>{
    console.log("Server Started....")
})