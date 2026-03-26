import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'TnvsConfiguration', timestamps: true })
export class TnvsConfiguration {
  @Prop({ unique: true, required: true })
  id!: string;

  @Prop()
  seaterCapacity!: number;

  @Prop()
  baseFare!: number;

  @Prop()
  perKilometer!: number;

  @Prop()
  perMinute!: number;

  @Prop()
  addStopBaseFare!: number;

  @Prop()
  maxSurge!: number;

  @Prop()
  pickupFee!: number;

  @Prop()
  status!: number;

  @Prop()
  timestamp!: string;

  @Prop()
  createdBy!: string;

  @Prop()
  modifiedBy!: string;
}

export type TnvsConfigurationDocument = TnvsConfiguration & Document;
export const TnvsConfigurationSchema =
  SchemaFactory.createForClass(TnvsConfiguration);
