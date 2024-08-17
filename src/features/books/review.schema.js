// make necessary imports here
import mongoose from "mongoose";

// write your code here
export const reviewSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    target:{
        type:String,
        required:true,
        enum:["Author","Book"]
    },
    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath: "target",
        required:true
    }
})
