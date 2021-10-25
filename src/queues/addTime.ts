import { ConsumeMessage } from 'amqplib';
import { AddTime } from '../interfaces/add-time';
import { ParkModel } from '../schemas/park.schema';
import { UserModel } from '../schemas/user.schema';

export const addTime = async (msg: ConsumeMessage) => {
  console.log(`ADD_TIME -- Message received msg: ${msg.content.toString()}`);
  const { parkId, chargedAmount, parkedTime } = JSON.parse(msg.content.toString()) as AddTime;
};
