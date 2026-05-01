import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VersionsDocuments = Versions & Document;

@Schema({ timestamps: true })
export class Versions {
  @Prop({ type: String, required: true })
  latestVersion!: string;

  @Prop({ type: String, required: true })
  description!: string;
}

export const VersionsSchema = SchemaFactory.createForClass(Versions);
