const mongo=require("mongoose")
const scheme=new mongo.Schema({
    todo:{
        type:String,
    },
    status:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    user_id:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    element_id:{
        type:String,
        required:true
    }
})
module.exports=mongo.model("Todo",scheme);
