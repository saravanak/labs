import PgBoss from 'pg-boss';

async function readme() {
  const boss = new PgBoss(process.env.JOB_DATABASE_URL);

  boss.on('error', (error: any) => console.error(error));

  try {

    await boss.start();
  } catch (error) {
    console.error({ error });
  }

  const queue = 'some-queue';

  let jobId = await boss.sendAfter(
    queue,
    { param1: 'foo after 60 seconds' },
    {},
    60
  );


  await boss.work(queue, someAsyncJobHandler);
}

async function someAsyncJobHandler(job: any) {
}

readme();
