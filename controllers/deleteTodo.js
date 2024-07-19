const Todo = require('../models/Todos');
async function delete_Todo(req,res){
    try{
        const {element_id}=req.body
        const data=await Todo.findOne({element_id})
        if(!data){
            res.status(500).json({
                msg:"Can't find the element with that id... "
            })
        }
        const todo = await Todo.findOneAndDelete({element_id});
        if(todo){
            res.status(200).json({
                msg:"Deleted Successfully.."
            })
        }else{
            res.status(500).json({
                msg:"Not Found the data for deletion...."
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            msg:"Deletion me dikkat h..."
        })
    }

}
module.exports={delete_Todo}