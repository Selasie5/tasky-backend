import { Request, Response, NextFunction } from "express";
import "../../types/express";
import { jwtUtils } from "../utils/jwt";
import { logger } from "../utils/logger";
import { User } from "../models/User";


declare global {
    namespace Express {
      interface Request {
        user?: import("../models/User").IUser;
      }
    }
  }
export const authMiddleware =async(req:Request, res:Response, next:NextFunction)=>
{
    try{
        //Getting token from header
        const token = req.headers.authorization?.split(' ')[1];
        if(!token)
        {
            logger.warn("No token provided");
            return res.status(401).json({message: "Unauthorized"});
        }

        //Verify token
        const decoded  = jwtUtils.verifyToken(token);

        //Find user in the database
        const user = await User.findById(decoded.id);
        if(!user)
        {
            logger.warn("User not found");
            return res.status(401).json({message: "unaithorized"});
        }

        //Attatch the user to the request object
        req.user = user;
        next();
    }
    catch(error:any){
        logger.error("Authentication failed",{error:error.message})
        res.status(401).json({message: "Unauthorized"});
    }
}