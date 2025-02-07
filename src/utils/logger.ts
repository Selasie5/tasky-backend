import * as Sentry from "@sentry/node";
import {env} from "../config/environment";

//Initializing Sentry
Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    tracesSampleRate:1.0
});

type logLevel = "info" | "error" | "warn";

//Util function
export const logger ={
    log:(level:logLevel, message:string, context?:Record<string, unknown>)=>
    {
        const logMessage = `[${level.toUpperCase()}] ${message}`;
        console[level](logMessage,context || "");

        if(level === "error")
        {
            Sentry.captureMessage(logMessage,{
                level: "error",
                extra: context,
            })
        }
    },

    //Info log
    info:(message:string, context?:Record<string, unknown>)=>
    {
        logger.log("info",message, context)
    },
    //Warn log
    warn:(message:string, context?:Record<string, unknown>)=>
    {
        logger.log("warn",message, context)
    },
    //Error log
    error:(message:string, context?:Record<string, unknown>)=>
    {
        logger.log("error",message, context)
    },


}
