// src/schemas/gps-device.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GPSDeviceDocument = GPSDevice & Document;

@Schema({ timestamps: true })
export class GPSDevice {
  @Prop({ required: true, unique: true, index: true })
  imei!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  })
  status!: 'online' | 'offline';

  @Prop({ type: Date, default: Date.now })
  lastPing!: Date;

  @Prop({ type: String, default: null })
  assignedUnitId?: string;

  @Prop()
  vehiclePlateNumber?: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Object, default: null })
  lastLocation?: {
    lat: number;
    lng: number;
    speed: number;
    battery: number;
    timestamp: Date;
  };

  @Prop()
  companyId?: string;
}
export const GPSDeviceSchema = SchemaFactory.createForClass(GPSDevice);
