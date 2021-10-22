import { Document, model, Schema } from 'mongoose';
import { CreditCard } from 'src/interfaces/card';
import { Vehicle } from 'src/interfaces/vehicle';

export interface User extends Document {
  name: string;
  login: string;
  password: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  currency: number;
  vehicles: Vehicle[];
  cards: CreditCard[];
}

const schema = new Schema({
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
  cards: [
    new Schema({
      creditCardNumber: { type: String },
      creditCardExpiration: { type: String },
    }),
  ],
});

export const UserModel = model<User>('User', schema);
