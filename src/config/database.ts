import mongoose from "mongoose";
import { env } from "./environment";

export const connectDB=async()=>
{
    try {
      await mongoose.connect(env.MONGODB_URI)  
      console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed");
    }
}