import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentType } from './payment-type.schema';

// --- Subschemas ---

@Schema({ _id: false })
class CarType {
  @Prop() _id!: string;
  @Prop() vehicleType!: string;
  @Prop() description!: string;
  @Prop() isActive!: boolean;
  @Prop() seats!: number;
}

@Schema({ _id: false })
class ZoneBounds {
  @Prop({ type: [[Number]] }) coordinates!: number[][];
}

@Schema({ _id: false })
class ZoneCenter {
  @Prop() lat!: number;
  @Prop() lng!: number;
}

@Schema({ _id: false })
class ZoneMaxBounds {
  @Prop() east?: number;
  @Prop() west?: number;
  @Prop() south?: number;
  @Prop() north?: number;
}

@Schema({ _id: false })
class Zone {
  @Prop() _id!: string;
  @Prop() name!: string;
  @Prop({ type: ZoneBounds }) bounds?: ZoneBounds;
  @Prop({ type: ZoneCenter }) center?: ZoneCenter;
  @Prop({ type: ZoneMaxBounds }) maxBounds?: ZoneMaxBounds;
}

// --- Main Schema ---

@Schema({ collection: 'BookingDetails' })
export class BookingsDetails {
  @Prop()
  id!: string;

  @Prop({ type: PaymentType })
  paymentType!: PaymentType;

  @Prop({ type: CarType })
  carType!: CarType;

  @Prop({ type: Zone })
  zone!: Zone;

  @Prop()
  travelFare?: number;

  @Prop()
  systemShare?: number;

  @Prop()
  requiredDriverBalance?: boolean;

  @Prop()
  referenceNumber?: string;

}

export type BookingsDetailsDocument = BookingsDetails & Document;
export const BookingsDetailsSchema =
  SchemaFactory.createForClass(BookingsDetails);
