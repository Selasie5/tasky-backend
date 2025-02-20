import { taskService } from "../../services/taskService";

export const taskResolver = {
    Query:{
        tasks:async()=>{
            return await taskService.getAllTasks();
        },
        task:async(_:any, {id}:{id:string})=>
        {
            return await taskService.getTaskById(id);
        }
    },

    Mutation:{
        createTask: async(_:any,{input}:{input:any})=>
        {
            return await taskService.createTask(input);
                },
        updateTask: async(_:any,{id,input}:{id:string,input:any})=>
         {
            return await taskService.updateTask(id,input);
                 },
        deleteTask: async(_:any,{id}:{id:any})=>
            {
                return await taskService.createTask(id);
                    },
                            
    }
}