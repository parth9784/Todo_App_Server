const express=require("express")
const { login, signup } = require("../controllers/Auth");
const { createtodo } = require("../controllers/Createtodo");
const route=express.Router()
const { Authmid }=require("../middlewares/Authmid");
const { get_todo } = require("../controllers/getTodo");
const { get_done } = require("../controllers/getdone");
const { delete_Todo } = require("../controllers/deleteTodo");

route.post("/login",login);
route.post("/signup",signup)
route.post("/createtodo",Authmid,createtodo)
route.get("/gettodo",Authmid,get_todo)
route.patch("/getdone",Authmid,get_done)
route.delete("/deletetodo",Authmid,delete_Todo)


module.exports=route;