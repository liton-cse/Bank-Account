import mongoose, { Schema } from "mongoose";
import { MONGO_DB_URL } from "./dotenv.js";


const connectDB= async ()=>{
    try{
        const db = await mongoose.connect(MONGO_DB_URL);
        if(db){
            console.log("✅ MongoDB Connected Successfully");
        }
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}
export default connectDB;