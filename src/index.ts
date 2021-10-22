import ampq from 'amqplib';
import { MongoConnection } from './mongo-connection';
import { UserModel } from './schemas/user.schema';

(async () => {
  const exchange = process.env.EXCHANGE_NAME;

  await MongoConnection.start();
  const conection = await ampq.connect(process.env.BROKER_URL);
  const channel = await conection.createChannel();

  channel.assertExchange(exchange, 'direct', {
    durable: true,
  });

  console.log('-> Connected waiting for messages\n');

  channel.consume('REQUEST_PARKING', async msg => {
    console.log(`-- Message received msg: ${msg.content.toString()}`);
    const { name } = JSON.parse(msg.content.toString());
    const user = await UserModel.findOne({ name }).lean();
    console.log(user);
  }, {
    noAck: true,
  });
})();
