import { differenceInMinutes } from 'date-fns';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';
import twilio from 'twilio';
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
            const client = twilio(process.env.TWILIO_ACCOUNTID, process.env.TWILIO_TOKEN);

            const notifyClients = parks
              .filter((park) => {
                const minsDiff = differenceInMinutes(park.parkEndTime, new Date(Date.now()));

                return minsDiff < 5 && minsDiff > 0;
              })
              .map((park) => {
                client.messages
                  .create({
                    from: 'Estacionadinha',
                    body: 'Olá, faltam 5 minutos para acabar seu tempo de estacionamento, caso for permanecer por mais tempo, lembre-se de renovar para evitar multas',
                    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICEID,
                    to: park.vehicleOwnerPhoneNumber,
                  })
                  .then((message) => console.log(message.body));
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
