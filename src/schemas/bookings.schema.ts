import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingsDocument = Bookings & Document;

// Helper function to generate random 10 uppercase letters
function generateReferenceNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

@Schema({ timestamps: true, collection: 'Bookings' })
export class Bookings {
  @Prop({ required: true })
  riderId!: string;

  @Prop()
  driverId?: string;

  @Prop({ type: Object })
  computations!: {
    baseFare: number;
    serviceFee: number;
    fareDistanceInKM: number;
    fareDurationInMins: number;
    costPerKM: number;
    costPerMin: number;
  };

  @Prop({ required: true, default: 'active' })
  status!: string;

  @Prop({ required: true, default: () => new Date().toDateString() })
  timestamp!: string;

  @Prop({ required: true })
  travelFare!: number;

  @Prop({ default: 0 })
  tripStatus!: number;

  @Prop()
  cancelledBy?: string;

  @Prop({ type: Object })
  origin!: {
    name: string;
    type: string;
    coordinates: [number, number];
  };

  @Prop({ type: Object })
  destination!: {
    name: string;
    type: string;
    coordinates: [number, number];
  };

  @Prop({ type: Object })
  driverLoc!: {
    name: string;
    type: string;
    coordinates: [number, number];
  };

  @Prop({ type: [Number], default: [] })
  driverRating!: number[];

  @Prop()
  discount?: number;

  @Prop()
  systemShare?: number;

  @Prop()
  pickupFare?: number;

  @Prop()
  incentives?: number;

  @Prop({ default: () => generateReferenceNumber(), unique: true })
  referenceNumber!: string;

  @Prop()
  seatType?: string;

  @Prop()
  paymentMethod?: string;

  @Prop()
  notes?: string;
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
