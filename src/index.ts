import ampq from 'amqplib';
import MongoConnection from './mongo-connection';
import { queues } from './queues/queues';

(async () => {
  const exchange = process.env.EXCHANGE_NAME;

  await MongoConnection.start();
  const conection = await ampq.connect(process.env.BROKER_URL);
  const channel = await conection.createChannel();

  channel.assertExchange(exchange, 'direct', {
    durable: true,
  });

  console.log('-> Connected waiting for messages\n');

  queues.forEach((queue) =>
    channel.consume(queue.name, (msg) => queue.processor(msg), {
      noAck: true,
    }),
  );
})();
