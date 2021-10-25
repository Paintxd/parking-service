import { ConsumeMessage } from 'amqplib';
import { add } from 'date-fns';
import { AddTime } from '../interfaces/add-time';
import { ParkModel } from '../schemas/park.schema';
import { UserModel } from '../schemas/user.schema';

const processor = async (msg: ConsumeMessage) => {
  console.log(`ADD_TIME -- Message received msg: ${msg.content.toString()}\n`);
  const { parkId, chargedAmount, parkedTime } = JSON.parse(msg.content.toString()) as AddTime;

  const park = await ParkModel.findById(parkId);
  park.parkEndTime = add(park.parkEndTime, { minutes: parkedTime });

  const user = await UserModel.findOne({ cpf: park.vehicleOwnerDocument });
  user.pay(chargedAmount);

  await Promise.all([user.save(), park.save()]);
};

export const addTime = { processor, name: 'ADD_TIME' };

/*
{
  "parkId": "617604c0d68a6d43d31e3774",
  "chargedAmount": 0.6,
  "parkedTime": 30
}
*/
