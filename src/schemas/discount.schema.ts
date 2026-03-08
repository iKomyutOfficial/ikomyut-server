import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileObjectSchema } from './file-object.schema';
import type { FileObject } from './file-object.schema';

export type DiscountDocument = Discounts & Document;

@Schema({ collection: 'Discounts', timestamps: true })
export class Discounts {
  @Prop({ unique: true })
  riderId!: string;

  @Prop({ unique: true })
  idNumber!: string;

  @Prop()
  name!: string;

  @Prop()
  idType?: 'student' | 'senior' | 'pwd';

  @Prop({ type: FileObjectSchema, default: {} })
  photoUrl?: FileObject;

  @Prop({ default: 'pending' })
  status?: 'pending' | 'approved' | 'rejected';

  @Prop()
  reviewedBy?: string;

  @Prop()
  reason?: string;

  @Prop()
  expirationDate?: Date;
}

export const DiscountsSchema = SchemaFactory.createForClass(Discounts);
