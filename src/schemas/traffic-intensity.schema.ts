import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'TrafficIntencity', timestamps: false })
export class TrafficIntensity {
  @Prop()
  id!: string;

  @Prop()
  intensityLevel!: string;

  @Prop()
  isPeakHour!: string;

  @Prop()
  surchargeRate!: string;

  @Prop()
  status!: string;

  @Prop()
  timestamp!: string;

  @Prop()
  modifiedBy!: string;
}

export type TrafficIntensityDocument = TrafficIntensity & Document;
export const TrafficIntensitySchema =
  SchemaFactory.createForClass(TrafficIntensity);
