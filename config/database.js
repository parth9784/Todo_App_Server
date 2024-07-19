const mongo=require("mongoose")
require("dotenv").config()
function dbconnect(){
    try{
        mongo.connect(process.env.DATABASE_URL).then(()=>{
            console.log("Database Connected...")
        })

    }
    catch(err){
        console.log("Database connection me dikkat h...")
        console.log(err)
        process.exit(1)
    }
    

}
module.exports=dbconnect;
