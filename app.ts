import express from "express"
import cors from "cors"
import { connectDB } from "./src/config/database";
import { env } from "./src/config/environment";
import { logger } from "./src/utils/logger";
import "./src/config/instrument"
import * as Sentry from "@sentry/node"

const app = express();

app.use(express.json());

app.use(cors());

app.get("/debug-sentry",  function mainHandler(req, res){
    res.send ("My first Sentry error")
   } );

Sentry.setupExpressErrorHandler(app);


//Start server
const startServer = async ()=>
{
    try {
          //Connect to database
    await connectDB();

    //Connect to RabbitMQ consumers


    //Start Apollo Server



    //Start expres  server
    app.listen({port:env.PORT},()=>
    {
        logger.info(`🎉✅ Server is running at http://localhost:${env.PORT}`)
    })
        
    } catch (error) {
       console.log(error);
       process.exit(1) ;
    } 
}

startServer();