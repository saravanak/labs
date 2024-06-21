import PgBoss from "pg-boss";

async function readme() {
  const boss = new PgBoss(process.env.JOB_DATABASE_URL);

  boss.on("error", (error: any) => console.error(error));

  try {
    console.log('Starting././');
    
      await boss.start();
    
  } catch (error) {
    console.log({error});
    
  }


  const queue = "some-queue";

  let jobId = await boss.sendAfter(queue, { param1: "foo after 60 seconds" }, {}, 60);

  console.log(`created job in queue ${queue}: ${jobId}`);

  await boss.work(queue, someAsyncJobHandler);
}

async function someAsyncJobHandler(job: any) {
  console.log(`job ${job.id} received with data:`);
  console.log(JSON.stringify(job.data));
}

readme();
