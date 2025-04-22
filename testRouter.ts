import express from 'express';
import { testCronJob } from './test';
import cron  from 'node-cron';
const Cronrouter = express.Router();

Cronrouter.get('/test-cron', async (req, res) => {
  cron.schedule('*/10 * * * *', async () => {
  await testCronJob();
  console.log("Cron job executed");
  console.log("Testing cron job at:", new Date().toISOString());
  })
  await testCronJob();
  res.send("Cron job test completed");
});

export default Cronrouter;
