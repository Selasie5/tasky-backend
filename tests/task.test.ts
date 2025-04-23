import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  beforeAll, 
  afterAll,
  afterEach,
  describe,
  test,
  expect
} from "vitest"
import { Task } from "../src/models/Task";
import { taskService } from "../src/services/taskService";




 describe("TASK MUTATION AND QUERY TESTS", ()=>
{
  let connection:any
 let mongoServer:MongoMemoryServer
  beforeAll(async()=>
  {
    mongoServer = await MongoMemoryServer.create()
    const mongoURI = await mongoServer.getUri();

    connection  = await mongoose.connect(mongoURI, {
      autoCreate: true
    })
    .then(()=> {
      console.log("Database connected")
    })
   });


   afterAll(async()=>
  {
    if(mongoServer){
      await mongoServer.stop()
      .then(async()=>
      {
        if(connection){
          await connection.close()
        }
      })
    }
  });

  afterEach(async()=>
  {
    await Task.deleteMany({})
  })

  describe("test for creating a task", ()=>
  {
    test("given a task title, descriptions status and deadline, create a task, and update the DB", async()=>
    {
        const input = {
          "title": "Get stuff done",
          "deadline": new Date("2025-04-22"),
          "description":"Get stuff done",
          "status": "OPEN"
        }

        const expectedOutput ={
          title: 'Get stuff done',
          description: 'Get stuff done',
          deadline: new Date("2025-04-22T00:00:00.000Z") ,
          status: 'OPEN'
         
        }

        const task = await taskService.createTask(input);
        console.log(task)
        expect(task).toMatchObject(expectedOutput)
    }),
    test("given a task title, description and deadline without valid  status value , the promise should be rejected and an error should be thrown",async ()=>
    {
      const input =  {
        "title": "Get stuff done",
          "deadline": new Date("2025-04-22"),
          "description":"Get stuff done",
          "status": "test-status"
      }

 
     expect(taskService.createTask(input)).rejects.toThrowError("Error creating task")
    }),
    test("given a task title, description and status without a deadline, a deadline of the date of the day after the current day should be set as the deadline", async()=>
    {
      
      const input = {
        "title": "Get stuff done",
        "description":"Get stuff done",
        "status": "OPEN"
      }
     expect(taskService.createTask({input} as any))
     .rejects
     .toThrowError("Error creating task")
    }),
    test("given a task description, status and deadline without valid  title value , the promise should be rejected and an error should be thrown",async ()=>
      {
        const input =  {
            "deadline": new Date("2025-04-22"),
            "description":"Get stuff done",
            "status": "test-status"
        }
  
   
       expect(taskService.createTask({input} as any)).rejects.toThrowError("Error creating task")
      })
  })
})



