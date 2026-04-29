import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp extends Document {
  @Prop({ required: true })
  mobnum!: string;

  @Prop({ required: true })
  code!: string;

  @Prop({ type: [{ msg: String, sent: Date }], default: [] })
  messages!: { msg: string; sent: Date }[];

  @Prop({ default: 0 })
  failedAttempts!: number;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
