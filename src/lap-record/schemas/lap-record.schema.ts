// src/schemas/lap-record.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LapRecordDocument = HydratedDocument<LapRecord>;

@Schema({ timestamps: true })
export class LapRecord {
  @Prop({ required: true, index: true })
  account!: string;

  @Prop({ required: true, index: true })
  deviceImei!: string;

  @Prop({ required: true })
  deviceName!: string;

  @Prop({ required: true, index: true })
  geofenceId!: string;

  @Prop()
  geofenceName?: string;

  @Prop({ required: true })
  lapNumber!: number;

  @Prop({ required: true, type: Number, index: true })
  timestamp!: number; // Unix timestamp in milliseconds

  @Prop()
  companyId?: string;
}

export const LapRecordSchema = SchemaFactory.createForClass(LapRecord);

// Compound indexes for efficient queries
LapRecordSchema.index({ account: 1, deviceImei: 1, timestamp: -1 });
LapRecordSchema.index({ account: 1, geofenceId: 1 });
