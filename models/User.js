const mongo=require("mongoose")
const scheme=new mongo.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports=mongo.model("User",scheme)