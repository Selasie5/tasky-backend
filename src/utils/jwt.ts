import jwt from "jsonwebtoken";
import  {env} from "../config/environment";


export const jwtUtils={

    //Generate JWT token
    generateToken:(userId:string):string=>
    {
        return jwt.sign({id:userId}, env.JWT__SECRET, {expiresIn:'1h'})
    },

    //Verify JWT token
    verifyToken:(token:string):{id:string}=>
    {
        try {
            return jwt.verify(token,env.JWT__SECRET) as {id:string};
        } catch (error) {
            throw new Error("Invalid or expired token")
        }
    }
}