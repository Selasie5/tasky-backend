import { User } from "../models/User";
import type { IUser } from "../models/User"; // Assuming IUser is the interface/type for User
import { jwtUtils } from "../utils/jwt";
import { passwordUtils } from "../utils/password";
import { logger } from "../utils/logger";

export const authService = {
    //Register a new user:
    register: async (name: string, email: string, password: string) => {
      try {
          // Check if user exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              throw new Error("User already exists");
          }

          // Hash password
          const hashedPassword = await passwordUtils.hashPassword(password);
          
          // Create user (ensure field names match your User model)
          const newUser = new User({
              name,
              email,
              password: hashedPassword
          }) as IUser & { _id: string };
          
          await newUser.save();

          // Generate token
          const token = jwtUtils.generateToken(newUser._id.toString());

          return { token, user: newUser };
          
      } catch (error: any) {
          logger.error("Error registering user", { error: error.message });
          throw new Error("Error registering user");
      }
  },

  login: async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email }) as IUser & { _id: string };
      if (!user) {
          throw new Error("User not found");
      }
      
      const passwordMatch = await passwordUtils.comparePassword(
          password, 
          user.password
      );
      
      if (!passwordMatch) {
          throw new Error("Invalid credentials");
      }
      
      const token = jwtUtils.generateToken(user._id.toString());
      return { token, user };
    } catch (error:any) {
      
      logger.error("Error logging in user", { error: error.message });
      throw new Error("Error logging in user");
    }
        
  }
}
  