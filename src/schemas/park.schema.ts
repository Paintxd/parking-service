import { Document, Model, model, Schema } from 'mongoose';

export interface Park extends Document {
  vehicleLicensePlate: string;
  vehicleOwnerDocument: string;
  vehicleOwnerPhoneNumber: string;
  parkStartTime: Date;
  parkEndTime: Date;
  notified: boolean;
}

const schema = new Schema<Park, Model<Park>, Park>({
  vehicleLicensePlate: {
    type: String,
    required: true,
  },
  vehicleOwnerPhoneNumber: {
    type: String,
    required: true,
  },
  vehicleOwnerDocument: {
    type: String,
    required: true,
  },
  parkStartTime: {
    type: Date,
    required: true,
  },
  parkEndTime: {
    type: Date,
    required: true,
  },
  notified: {
    type: Boolean,
    default: false,
  },
});

export const ParkModel = model<Park>('Park', schema);
