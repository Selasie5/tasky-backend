import amqp from "amqplib";
import { logger } from "../utils/logger";
import { env } from "../config/environment";

export const sendNotificationToQueue =async (notification:any)=>
{
    const QUEUE = "notification_queue";
    const QUEUE_URI = env.RABBITMQ_URL || "amqp://localhost:5672";
    try {
        const connection = await amqp.connect(QUEUE_URI);
        
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, {durable:true});
        await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)), {persistent:true});
        logger.info(`Notification ${notification.id} sent to queue`);
    } catch (error:any) {
        logger.error(error.message);
        throw new Error("Error sending notification to queue");
    }
}
