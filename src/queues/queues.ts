import { addTime } from './addTime';
import { removeVehicle } from './removeVehicle';
import { requestParking } from './requestParking';

export const queues = [
  requestParking,
  addTime,
  removeVehicle,
];
