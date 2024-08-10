// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";

const url = 'mongodb://localhost:27017';

export const connectUsingMongoose = async () => {
  // write your code here
try{
  await mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true
    });
    console.log("MongoDB connected using Mongoose");
   } catch(err){
      console.log("Error while connecting to db");
      console.log(err);
  }
};
