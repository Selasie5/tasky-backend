import express from "express"
import cors from "cors"
import { connectDB } from "./src/config/database";
import { env } from "./src/config/environment";
const app = express();

app.use(express.json());

app.use(cors());

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
        console.log(`🎉✅ Server is running at http://localhost:${env.PORT}`)
    })
        
    } catch (error) {
       console.log(error);
       process.exit(1) ;
    } 
}

startServer();