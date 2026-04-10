import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionsDocuments = Transactions & Document;

@Schema({ collection: 'TransactionLogs', timestamps: true })
export class Transactions {
  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true })
  bookingId!: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ required: true, enum: ['driver', 'rider'] })
  userType!: string;

  @Prop({ required: true })
  description!: string;

  @Prop()
  topupBy?: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
