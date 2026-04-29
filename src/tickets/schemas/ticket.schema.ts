import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Location } from '../../common/schemas/location.schema';

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true, unique: true, refNumber: 1 })
  refNumber!: string;

  @Prop({ required: true })
  unitCode!: string;

  @Prop({ required: true })
  plateNumber!: string;

  @Prop({ required: true })
  routeId!: string;

  @Prop({ required: true })
  driverUsername!: string;

  @Prop({ required: true })
  conductorUsername!: string;

  @Prop({ type: Object })
  pickupLoc?: Location;

  @Prop({ type: Object })
  dropoffLoc?: Location;

  @Prop({ required: true })
  pickupAddress!: string;

  @Prop({ required: true })
  dropoffAddress!: string;

  @Prop({ required: true })
  companyId!: string;

  @Prop({ required: true })
  timestamp!: string;

  @Prop({ required: true })
  fare!: number;

  @Prop({ required: true })
  distance!: number;

  @Prop()
  fixedDistance?: number;

  @Prop({ required: true })
  discount!: number;
}

// Use HydratedDocument instead of Document
export type TicketDocument = HydratedDocument<Ticket>;

// Create schema
export const TicketSchema = SchemaFactory.createForClass(Ticket);

// Optional: geo indexes
TicketSchema.index({ pickupLoc: '2dsphere' });
TicketSchema.index({ dropoffLoc: '2dsphere' });
