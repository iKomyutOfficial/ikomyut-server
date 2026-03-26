import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'TimeMatrix', timestamps: false })
export class TimeMatrix {
  @Prop({ unique: true, index: 1 })
  id!: string;

  @Prop()
  _v!: number;

  @Prop()
  rangeTimeFrom!: string;

  @Prop()
  rangeTimeTo!: string;

  @Prop()
  tTime!: number;

  @Prop()
  status!: number;

  @Prop()
  createdOn!: string;

  @Prop()
  createdBy!: string;

  @Prop()
  updatedAt!: string;

  @Prop()
  modifiedBy!: string;
}

export type TimeMatrixDocument = TimeMatrix & Document;
export const TimeMatrixSchema = SchemaFactory.createForClass(TimeMatrix);
