import ampq from 'amqplib';
import MongoConnection from './mongo-connection';
import { queues } from './queues/queues';
import Scheduler from './scheduler';

(async () => {
  await MongoConnection.start();
  new Scheduler();
  const conection = await ampq.connect(process.env.BROKER_URL);
  const channel = await conection.createChannel();

  channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', {
    durable: true,
  });

  console.log('-> Connected waiting for messages\n');

  queues.forEach((queue) =>
    channel.consume(queue.name, (msg) => queue.processor(msg), {
      noAck: true,
    }),
  );
})();
