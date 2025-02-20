import cron from "node-cron";
import { Task } from "../models/Task";
import { logger } from "./logger";
import { taskService } from "../services/taskService";


//Schedule a cron job to check for due tasks every minute
cron.schedule('* * * * *', async()=>
{
    try {
        const now = new Date();
        const dueTasks = await Task.find({deadline: {$lte:now}, status:{$ne:'completed'}});

        for (const task of dueTasks){
            //Send email to user

            task.status = "overdue";
            await task.save();

            logger.info(`Email sent for overdue task: ${task.title}`);
        }
    } catch (error:any) {
        logger.error(`Failed to check for due tasks`, {error:error.message})
    }
});

//Dealdline scheduling for a task
export const scheduleDeadlineTask =(task:any)=>
{
    const deadline=  new Date(task.deadline);
    const now = new Date();

    //The delay is being calculated in milliseconds
    const delay = deadline.getTime() - now.getTime();

    if(delay > 0){
        setTimeout(async()=>
        {
            try {
                //Send email to the user

                //Updating task status
                task.status = 'overdue';
                await task.save();
                logger.info(`Email sent for overdue task:${task.title}`)
            } catch (error:any) {
                logger.error("Failed to send deadline email", {error:error.message})
            }
        })
    }
}