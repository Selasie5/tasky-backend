import amqp from "amqplib";
import { logger } from "../utils/logger";

export const sendNotificationToQueue =async (notification:any)=>
{
    const QUEUE = "notification_queue";

    try {
        const connection  = await amqp.connect("amqp://localhost:5672");
        
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, {durable:true});
        await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notification)), {persistent:true});
        logger.info(`Notification ${notification.id} sent to queue`);
    } catch (error:any) {
        logger.error(error.message);
        throw new Error("Error sending notification to queue");
    }
}
