const mongoose=require("mongoose");
const FoodSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
})
const FoodData=mongoose.model("FoodData",FoodSchema);
module.exports=FoodData;