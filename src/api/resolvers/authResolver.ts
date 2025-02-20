import e from "express";
import { authService } from "../../services/authService";

interface LoginArgs {
    email: string;
    password: string;
}
interface RegisterArgs {
    name:string
    email: string;
    password: string;
}

export const authResolver = {
    Mutation: {
        login: async (__: any, { email, password }: LoginArgs) => {
            return authService.login(email, password)
        },
        register :async(_:any, {name, email, password}:RegisterArgs)=>
        {
            return authService.register(name,email, password)
        }
    }
}