import { sendNotificationToQueue } from "../queues/notificationProduce"
import { logger } from "../utils/logger";

export const notificationService = {
    sendNotification: async(message:string, userId:string)=>
    {
        try {
            await sendNotificationToQueue({message, userId});
            logger.info("Notification sent to queue");
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Error sending notification");
        }
    }
}