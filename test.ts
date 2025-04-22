import cron from "node-cron";
import { Task } from "./src/models/Task";
import { User } from "./src/models/User";
import { logger } from "./src/utils/logger";
import { sendEmail } from "./src/utils/email";

export async function testCronJob() {
  try {
    const now = new Date();
    console.log("Testing cron job at:", now.toISOString());
    
    const dueTasks = await Task.find({
      deadline: {$lte: now},
      status: {$ne: 'completed'}
    });
    
    const users = await User.find({email: {$ne: null}});
    
    if (users.length === 0) {
      console.warn("No users with emails found!");
      return;
    }

    for (const task of dueTasks) {
      for (const user of users) {
        console.log(`Attempting to send email for task "${task.title}" to ${user.email}`);
        
        await sendEmail({
          to: user.email,
          subject: "TEST: Task Deadline Reached",
          text: `TEST: The task "${task.title}" is due. Please complete it as soon as possible`
        });

        task.status = "IN_PROGRESS";
        await task.save();
        console.log(`Email sent for overdue task: ${task.title}`);
      }
    }
  } catch (error: any) {
    console.error("Test failed:", error.message);
  }
}

// Call it immediately
// testCronJob();
