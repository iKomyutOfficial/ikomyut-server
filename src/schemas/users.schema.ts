import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../types/location';
import { RideHistory } from '../types/ride-history';
import { FileObjectSchema } from './file-object.schema';
import type { FileObject } from './file-object.schema';

export type UsersDocument = Users & Document;

@Schema({
  collection: 'Users',
  timestamps: true,
  toJSON: {
    transform: (_, ret: any) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class Users {
  @Prop({
    unique: true,
    index: true,
  })
  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ default: 'rider', enum: ['rider', 'driver', 'admin'] })
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

  @Prop({ type: FileObjectSchema, default: {} })
  photo?: FileObject;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: false })
  isLogged!: boolean;

  @Prop()
  authToken?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);