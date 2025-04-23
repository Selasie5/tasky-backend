import { logger } from "@sentry/core";
import amqp from "amqplib"
import { env } from "../config/environment";

export const sendTaskToQueue =async(task:any)=>
{
    const QUEUE = "task_queue";
    const QUEUE_URI = env.RABBITMQ_URL || "amqp://localhost:5672";
    try {
        const connection = await amqp.connect(QUEUE_URI);
        console.log("Connected to RabbitMQ");
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, {durable:true});
        await channel.sendToQueue(QUEUE, Buffer.from (JSON.stringify(task)), {persistent:true});
    } catch (error:any) {
      // console.log(error)
        logger.error(error.message);
        throw new Error("Error sending task to queue");
    }
}
