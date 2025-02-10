import { logger } from "@sentry/core";
import amqp from "amqplib"

export const sendTaskToQueue =async(task:any)=>
{
    const QUEUE = "task_queue";

    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, {durable:true});
        await channel.sendToQueue(QUEUE, Buffer.from (JSON.stringify(task)), {persistent:true});
    } catch (error:any) {
        logger.error(error.message);
        throw new Error("Error sending task to queue");
    }
}