import { Request, Response, NextFunction } from "express";
import {logger} from "../utils/logger";
import { env } from "../config/environment";

export const errorHandler=(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>
{
    logger.error("An error occured",{error:error.message, stack:error.stack});

    res.status(500).json({
        message:"Something went wrong",
        error: env.NODE_ENV === "development" ? error.message:undefined,
    })
}