import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RainyDaySurchargeDocument = RainyDaySurcharge & Document;

@Schema({ collection: 'RainyDay', timestamps: true })
export class RainyDaySurcharge {
  @Prop({ required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  weatherCondition!: string;

  @Prop({ required: true })
  intensityFactor!: number;

  @Prop({ required: true })
  baseSurcharge!: number;

  @Prop({ required: true })
  rainyDaySurchargerate!: number;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  timestamp!: string;

  @Prop({ required: true })
  createdBy!: string;

  @Prop()
  modifiedBy!: string;

  @Prop({ type: Number })
  surchargeRate!: number;
}

export const RainyDaySurchargeSchema =
  SchemaFactory.createForClass(RainyDaySurcharge);
