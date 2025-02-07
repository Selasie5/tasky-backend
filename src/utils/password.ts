import bcrypt from "bcrypt"


//Number of salt rounds for hashing
const SALT_ROUNDS = 10;

export const passwordUtils ={
    hashPassword:async(password:string):Promise<string>=>
    {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },

    //compare passwords
    comparePassword:async(password:string, hash:string):Promise<boolean>=>
    {
        return await bcrypt.compare(password, hash)
    }
}