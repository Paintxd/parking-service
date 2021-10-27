import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

export default class Scheduler {
  private scheduler: ToadScheduler;
  constructor() {
    this.scheduler = new ToadScheduler();
    this.smsJobTask();
  }

  smsJobTask() {
    const task = new AsyncTask(
      'SMS sender task',
      () => {
        return Promise.resolve(console.log('testando 123'));
      },
      (err: Error) => console.log(`SMS task error: ${err}`),
    );

    const job = new SimpleIntervalJob({ minutes: 1 }, task);

    this.scheduler.addSimpleIntervalJob(job);
  }
}
