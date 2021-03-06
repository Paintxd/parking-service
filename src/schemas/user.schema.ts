import { Document, Model, model, Schema } from 'mongoose';
import { CreditCard } from '../interfaces/card';
import { Vehicle } from '../interfaces/vehicle';

export interface User extends Document {
  name: string;
  login: string;
  password: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  currency: number;
  vehicles: Vehicle[];
  pay(price: number): void;
  refound(value: number): void;
}

const schema = new Schema<User, Model<User>, User>({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: Number,
    default: 0.0,
  },
  vehicles: [
    new Schema({
      description: { type: String },
      type: { type: String },
      licensePlate: { type: String },
    }),
  ],
});

schema.methods.pay = function (price: number): void {
  this.currency = Number.parseFloat((this.currency - price).toFixed(2));
};

schema.methods.refound = function (value: number): void {
  this.currency += value;
};

export const UserModel = model<User>('User', schema);
