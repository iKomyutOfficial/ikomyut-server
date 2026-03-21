import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../types/location';
import { RideHistory } from '../types/ride-history';
import {
  PersonalRequirementsSchema,
  PersonalRequirements,
} from './drivers-personal-req.schema';
import {
  TransportRequirementsSchema,
  TransportRequirements,
} from './drivers-transport-req.schema';

export type DriversDocument = Drivers & Document;

@Schema({
  collection: 'Drivers',
  timestamps: true,
  toJSON: {
    transform: (_, ret: any) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class Drivers {
  @Prop({
    unique: true,
    index: true,
  })
  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ default: 'driver', enum: ['rider', 'driver', 'admin'] })
  type!: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  mobnum!: string;

  @Prop({
    type: [
      {
        rideId: String,
        date: Date,
      },
    ],
    default: [],
  })
  rideHistory!: RideHistory[];

  @Prop({
    type: [
      {
        name: String,
        lat: Number,
        lng: Number,
      },
    ],
    default: [],
  })
  places!: Location[];

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  address?: string;

  @Prop()
  fcmToken?: string;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: false })
  isLogged!: boolean;

  @Prop()
  authToken?: string;

  @Prop({ default: 'pending' })
  status?: string;

  @Prop()
  updatedBy!: string;

  @Prop({ type: PersonalRequirementsSchema, default: {} })
  personalRequirements?: PersonalRequirements;

  @Prop({ type: TransportRequirementsSchema, default: {} })
  transportRequirements?: TransportRequirements;
}

export const DriversSchema = SchemaFactory.createForClass(Drivers);
