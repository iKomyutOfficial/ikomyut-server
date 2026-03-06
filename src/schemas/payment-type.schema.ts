// src/schemas/payment-type.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentTypeDocument = PaymentType & Document;

@Schema({ collection: 'PaymentType' })
export class PaymentType {
  @Prop({ required: true })
  paymentType!: string;

  @Prop()
  description!: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const PaymentTypeSchema = SchemaFactory.createForClass(PaymentType);
