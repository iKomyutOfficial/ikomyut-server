import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'DriverDetails' })
export class DriverDetails {
  @Prop({ type: Types.ObjectId, required: true })
  _id!: Types.ObjectId;

  @Prop({ default: 0 })
  walletBalance!: number;
}

export type DriverDetailsDocument = DriverDetails & Document;
export const DriverDetailsSchema = SchemaFactory.createForClass(DriverDetails);
