import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingsDocument = Bookings & Document;

@Schema({
  collection: 'Bookings',
  timestamps: true,
  toJSON: {
    transform: (_, ret: any) => {
      delete ret.__v;
      return ret;
    },
  },
})
export class Bookings {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  riderId!: string;

  @Prop({
    type: String,
    index: true,
  })
  driverId?: string;

  @Prop({
    type: {
      baseFare: Number,
      serviceFee: Number,
      fareDistanceInKM: Number,
      fareDurationInMins: Number,
      costPerKM: Number,
      costPerMin: Number,
    },
    default: {},
  })
  computations?: {
    baseFare: number;
    serviceFee: number;
    fareDistanceInKM: number;
    fareDurationInMins: number;
    costPerKM: number;
    costPerMin: number;
  };

  @Prop({
    type: {
      name: String,
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
    required: true,
  })
  origin!: {
    name: string;
    type: string;
    coordinates: number[];
  };

  @Prop({
    type: {
      name: String,
      type: { type: String, default: 'Point' },
      coordinates: [Number],
    },
    required: true,
  })
  destination!: {
    name: string;
    type: string;
    coordinates: number[];
  };

  @Prop({ type: Number })
  pickupFare?: number;

  @Prop({ type: Number })
  travelFare?: number;

  @Prop({ default: '' })
  notes?: string;

  @Prop({
    type: [Number],
    default: [],
  })
  driverRating?: number[];

  @Prop({
    type: String,
    enum: ['inactive', 'active', 'cancelled', 'booked', 'finished'],
    default: 'active',
  })
  status!: string;

  @Prop({ type: String })
  timestamp?: string;

  @Prop({ default: 0 })
  tripStatus?: number;

  @Prop({
    type: String,
    enum: ['driver', 'rider'],
  })
  cancelledBy?: string;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
    },
  })
  driverLoc?: {
    lat: number;
    lng: number;
  };
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
