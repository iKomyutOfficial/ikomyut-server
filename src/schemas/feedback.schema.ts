import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ collection: 'Feedback', timestamps: true })
export class Feedback {
  @Prop()
  public id!: string;

  @Prop()
  public msg!: string;
}
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
