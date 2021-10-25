import { ConsumeMessage } from 'amqplib';
import { add } from 'date-fns';
import { RequestParking } from '../interfaces/request-parking';
import { ParkModel } from '../schemas/park.schema';
import { UserModel } from '../schemas/user.schema';

export const processor = async (msg: ConsumeMessage) => {
  console.log(`REQUEST_PARKING -- Message received msg: ${msg.content.toString()}\n`);
  const {
    chargedAmount,
    parkedTime,
    vehicleOwnerDocument,
    vehicleOwnerPhoneNumber,
    vehicleLicensePlate,
  } = JSON.parse(msg.content.toString()) as RequestParking;

  const parkStartTime = new Date(Date.now());
  const parkEndTime = add(parkStartTime, { minutes: parkedTime });

  const user = await UserModel.findOne({ cpf: vehicleOwnerDocument });
  user.pay(chargedAmount);

  await Promise.all([
    user.save(),
    ParkModel.create({
      vehicleLicensePlate,
      vehicleOwnerDocument,
      vehicleOwnerPhoneNumber,
      parkStartTime,
      parkEndTime,
    }),
  ]);
};

export const requestParking = { processor, name: 'REQUEST_PARKING' };

/*
{
  "vehicleLicensePlate": "ADE145C",
  "vehicleOwnerPhoneNumber": "49999653083",
  "vehicleOwnerDocument": "15935888291",
  "parkedTime": 30,
  "chargedAmount": 0.6
}
*/
