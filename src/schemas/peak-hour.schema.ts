import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'PeakHour', timestamps: false })
export class PeakHour {
  @Prop()
  id!: string;

  @Prop()
  _v!: number;

  @Prop()
  dayOfWeek!: string;

  @Prop()
  AMPMSPECIAL!: string;

  @Prop()
  FROM!: string;

  @Prop()
  TO!: string;

  @Prop({ type: Number, required: true })
  peakHourSurcharge!: number;

  @Prop()
  Status!: string;

  @Prop()
  timestamp!: string;

  @Prop()
  createdBy!: string;

  @Prop()
  updatedAt!: string;

  @Prop()
  modifiedBy!: string;
}

export type PeakHourDocument = PeakHour & Document;
export const PeakHourSchema = SchemaFactory.createForClass(PeakHour);
