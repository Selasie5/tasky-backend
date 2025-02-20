import nodemailer from "nodemailer";
import { logger } from "./logger";
import { env } from "../config/environment";

//Create transporter 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD
    }
})

//Send email
export const sendEmail= async({to, subject,text}:{to:string,subject:string,text:string})=>
{
    try {
        const mailOptions = {
            from: env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${to}`);
    } catch (error:any) {
        logger.error("Failed to send email", {error:error.message});
        throw new Error ("Failed to send email");
    }
}