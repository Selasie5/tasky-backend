import { User } from "../models/User";
import { logger } from "../utils/logger";

export const userService= {
    getUserById: async(id:string)=>
    {
        try {
            const user = await User.findById(id);
            if(!user)
                {
                    throw new Error("User not found");
                }
            return user;
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Erroe getting user by id");
        }
    }
}