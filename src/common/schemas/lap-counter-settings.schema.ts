// src/schemas/lap-counter-settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LapCounterSettingsDocument = HydratedDocument<LapCounterSettings>;

@Schema({ timestamps: true })
export class LapCounterSettings {
  @Prop({ required: true, unique: true, index: true })
  account!: string;

  @Prop({ required: true })
  geofenceId!: string;

  @Prop()
  geofenceName?: string;

  @Prop()
  companyId?: string;
}

export const LapCounterSettingsSchema =
  SchemaFactory.createForClass(LapCounterSettings);
