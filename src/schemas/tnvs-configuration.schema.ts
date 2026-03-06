import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'TnvsConfiguration', timestamps: false })
export class TnvsConfiguration {
  @Prop()
  id!: string;

  @Prop()
  _v!: number;

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
  status!: number;

  @Prop()
  timestamp!: string;

  @Prop()
  createdBy!: string;

  @Prop()
  updatedAt!: string;

  @Prop()
  modifiedBy!: string;
}

export type TnvsConfigurationDocument = TnvsConfiguration & Document;
export const TnvsConfigurationSchema =
  SchemaFactory.createForClass(TnvsConfiguration);
