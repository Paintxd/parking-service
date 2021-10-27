import { ConsumeMessage } from 'amqplib';
import { differenceInMinutes } from 'date-fns';
import { RemoveVehicle } from '../interfaces/remove-vehicle';
import { ParkModel } from '../schemas/park.schema';
import { UserModel } from '../schemas/user.schema';

export const processor = async (msg: ConsumeMessage) => {
  console.log(`REMOVE_VEHICLE -- Message received msg: ${msg.content.toString()}\n`);
  const { parkId } = JSON.parse(msg.content.toString()) as RemoveVehicle;

  const park = await ParkModel.findById(parkId);

  const now = new Date(Date.now());
  const refoundValue = Number((differenceInMinutes(park.parkEndTime, now) * 0.2).toFixed(2));

  park.unpark(now, refoundValue);

  const user = await UserModel.findOne({ cpf: park.vehicleOwnerDocument });
  user.refound(refoundValue);

  await Promise.all([park.save(), user.save()]);
};

export const removeVehicle = { processor, name: 'REMOVE_VEHICLE' };

/*
{
  "parkId": "61770ae69dbb68657cbf65c8"
}
*/
