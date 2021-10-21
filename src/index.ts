import ampq from 'amqplib';

(async () => {
  const exchange = process.env.EXCHANGE_NAME;

  const conection = await ampq.connect(process.env.BROKER_URL);
  const channel = await conection.createChannel();

  channel.assertExchange(exchange, 'direct', {
    durable: true,
  });

  console.log('-> Connected waiting for messages\n');


  channel.consume('REQUEST_PARKING', msg => {
    console.log(`-- Message received msg: ${msg.content.toString()}`);
  }, {
    noAck: true,
  });
})();
