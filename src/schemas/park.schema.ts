import { Document, Model, model, Schema } from 'mongoose';

export interface Park extends Document {
  vehicleLicensePlate: string;
  vehicleOwnerDocument: string;
  vehicleOwnerPhoneNumber: string;
  parkStartTime: Date;
  parkEndTime: Date;
  notified: boolean;
  refoundValue: number;
  unpark(time: Date, refoundValue: number): void;
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
  refoundValue: {
    type: Number,
    default: 0.0,
  },
});

schema.methods.unpark = function (time: Date, refoundValue: number): void {
  this.notified = true;
  this.parkEndTime = time;
  this.refoundValue = refoundValue;
};

export const ParkModel = model<Park>('Park', schema);
