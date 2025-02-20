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
  export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        logger.warn('No token provided');
        res.status(401).json({ message: 'Unauthorized' });
        return; // Exit the middleware
      }
  
      // Verify the token
      const decoded = jwtUtils.verifyToken(token);
  
      // Find the user in the database
      const user = await User.findById(decoded.id);
      if (!user) {
        logger.warn('User not found');
        res.status(401).json({ message: 'Unauthorized' });
        return; // Exit the middleware
      }
  
      // Attach the user to the request object
      req.user = user;
      next(); // Pass control to the next middleware or route handler
    } catch (error: any) {
      logger.error('Authentication failed', { error: error.message });
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  