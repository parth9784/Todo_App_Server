const Todo = require('../models/Todos');
async function get_done(req,res){
    try{
        const {element_id}=req.body
        const data=await Todo.findOne({element_id})
        if(!data){
            res.status(500).json({
                msg:"Can't find the element with that id... "
            })
        }
        data.status=!data.status;
        await data.save()
        res.status(200).json({
            msg:"Changes Reflected..."
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            msg:"Get done me dikkat h..."
        })
    }

}
module.exports={get_done}