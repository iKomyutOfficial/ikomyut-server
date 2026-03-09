import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Messages & Document;

@Schema({ collection: 'Messages', timestamps: true })
export class Messages {
  @Prop()
  public bookingId!: string;

  @Prop()
  public riderId!: string;

  @Prop()
  public driverId!: string;

  @Prop()
  public msg!: string;

  @Prop()
  public sender!: 'rider' | 'driver';
}
export const MessagesSchema = SchemaFactory.createForClass(Messages);
