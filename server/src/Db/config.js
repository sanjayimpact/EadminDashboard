import mongoose from "mongoose";


export const dbConnect = async()=>{
    try{
       let connect  = await mongoose.connect("mongodb+srv://admin:admin@cluster0.lcm6m.mongodb.net/rtkquery?retryWrites=true&w=majority&appName=Cluster0");
       if(connect){
        console.log("DB connected successfully");
       }else{
        console.log("DB connection failed");
       }
    }catch(err){
        console.log("Error in DB connection",err);
    }
}