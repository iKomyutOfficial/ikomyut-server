import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'UserDetails' })
export class UserDetails {
  @Prop({ type: Types.ObjectId, required: true })
  _id!: Types.ObjectId;

  @Prop({ default: 0 })
  walletBalance!: number;
}

export type UserDetailsDocument = UserDetails & Document;
export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
