import { Task } from "../models/Task"
import {logger} from "../utils/logger"
export const taskService ={

    //Create a task
    createTask: async(input: {title:string, description:string, status:string})=>
    {
        try {
            const task = new Task (input);
            await task.save();
    
            //Sending task to message queue


            return task;
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Error creating task");
        }
        
    },

    
    //Get all tasks
    getAllTasks:async()=>
    {
        try {
            const tasks  = await Task.find();
            return tasks;
            
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Error getting all tasks");
            
        }
    },

    //Get A Task by Id
    getTaskById:async(id:string)=>
    {
        try {
            const task = await Task.findById(id);
            if(!task){
                throw new Error("Task not found");
            }
            return task;
            
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Error getting task by Id");
            
        }
    },

    //Update a task
    updateTask:async(id:string, input:{title:string, description:string, status:string})=>
    {
        try {
            const updatedTask= await Task.findByIdAndUpdate(id, input, {new:true});
            if(!updatedTask)
                {
                    throw new Error("Task not found");
                } 
                return updatedTask;
        } catch (error:any) {
            logger.error(error.message);
            throw new Error("Error updating task");
        }
    },


    //Delete a task
    deleteTask: async(id:string)=>
    {
        try{
            const task = await Task.findByIdAndDelete(id);
            if(!task)
            {
                throw new Error("Task not found");
            }

            return true;
        }
        catch(error:any)
        {
            logger.error(error.message);
            throw new Error("Error deleting task");
        }
    }
}