import mongoose from "mongoose";
import { env } from "./environment";
import { logger } from "../utils/logger";

const clientOptions = { serverApi: { version: "1" as const, strict: true, deprecationErrors: true } };

export const connectDB=async()=>
{
    try {
      await mongoose.connect(env.MONGODB_URI, clientOptions)  
      logger.info("✅ Database connected successfully")
    } catch (error) {
        console.log(error)
        logger.error("❌ Database connection failed")
    }
}
