import mongoose from "mongoose";
import { env } from "./environment";


const clientOptions = { serverApi: { version: "1" as const, strict: true, deprecationErrors: true } };

export const connectDB=async()=>
{
    try {
      await mongoose.connect(env.MONGODB_URI, clientOptions)  
      console.log("✅ Database connected successfully");
    } catch (error) {
        console.log(error)
        console.error("❌ Database connection failed");
    }
}
