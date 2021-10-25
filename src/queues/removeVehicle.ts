import { ConsumeMessage } from 'amqplib';

export const removeVehicle = (msg: ConsumeMessage) => {
  console.log(`REMOVE_VEHICLE -- Message received msg: ${msg.content.toString()}`);
};
