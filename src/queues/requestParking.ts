import { ConsumeMessage } from 'amqplib';
import { add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { RequestParking } from '../interfaces/request-parking';
import { ParkModel } from '../schemas/park.schema';
import { UserModel } from '../schemas/user.schema';

export const requestParking = async (msg: ConsumeMessage) => {
  console.log(`REQUEST_PARKING -- Message received msg: ${msg.content.toString()}`);
  const {
    chargedAmount,
    parkedTime,
    vehicleOwnerDocument,
    vehicleOwnerPhoneNumber,
    vehicleLicensePlate,
  } = JSON.parse(msg.content.toString()) as RequestParking;

  const parkStartTime = utcToZonedTime(new Date(Date.now()), 'America/Sao_Paulo');
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
