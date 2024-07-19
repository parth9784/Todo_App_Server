const todomodel=require("../models/Todos")
const { v4: uuidv4 } = require('uuid');
async function createtodo(req,res){
    try{
        const {todo}=req.body;
        const newtodo=await todomodel.create({
            todo:todo,
            user_id:req.userid,
            element_id:uuidv4()
        })
        res.status(200).json({
            msg:"Created Todo Successfully..."
        })

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            msg:"Create Todo me dikkat h..."
        })
    }
}
module.exports={createtodo}