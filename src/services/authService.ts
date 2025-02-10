import { User } from "../models/User"
import { jwtUtils } from "../utils/jwt";
import { passwordUtils } from "../utils/password";
import { logger } from "../utils/logger";

export const authService = {
    //Register a new user:
    register : async(email:string, password:string)=>
    {
        try {
            const user = await User.find({email});
            if(!user)
            {
                throw new Error("user already exists");
            }
    
            const hashedPassword = await passwordUtils.hashPassword(password);
            const newUser = new User({email,hashedPassword});
            await newUser.save();
    
            //Generate JWT token
            const token = jwtUtils.generateToken(newUser._id as string);
    
            return {token,newUser};
            
        } catch (error:any) {
            logger.error("Error registering user",{error:error.message});
            throw new Error("Error registering user");
        }
        //Check if the user already exists
       
    },

    login:async(email:string,password:string)=>
    {
        try {
             //Find the user in the database
        const user = await User.findOne({email});
        if(!user)
        {
            throw new Error("User not found");
        }
        
        const passwordMatch = await passwordUtils.comparePassword(password, user.password);
        if(!passwordMatch){
            throw new Error("Invalid credentials");
        }
        const token  = jwtUtils.generateToken(user._id as string);
        return {token, user};
            
        } catch (error:any) {
            logger.error("Error logging in user",{error:error.message});
            throw new Error("Error logging in user");
        }
       

    }
}