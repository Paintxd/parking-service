import { differenceInMinutes } from 'date-fns';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import { ParkModel } from './schemas/park.schema';

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
        return ParkModel.find({ notified: false })
          .exec()
          .then((parks) => {
            const notifyClients = parks.filter((park) => {
              const minsDiff = differenceInMinutes(park.parkEndTime, new Date(Date.now()));

              return minsDiff < 5 && minsDiff > 0;
            });

            console.log(notifyClients);
          });
      },
      (err: Error) => console.log(`SMS task error: ${err}`),
    );

    const job = new SimpleIntervalJob({ minutes: 1 }, task);

    this.scheduler.addSimpleIntervalJob(job);
  }
}
