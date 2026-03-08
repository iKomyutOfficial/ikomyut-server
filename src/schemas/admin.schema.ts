import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileObjectSchema } from './file-object.schema';
import type { FileObject } from './file-object.schema';

export type AdminsDocument = Admins & Document;

@Schema({ collection: 'Admins', timestamps: true })
export class Admins {
  @Prop({ type: String, required: true, unique: true })
  employeeId!: string;

  @Prop({ type: String, required: true, unique: true })
  username!: string;

  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String })
  middleName?: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true })
  mobnum!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop()
  address!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  position!: string;

  @Prop()
  roleId?: string;

  @Prop({ default: 'admin' })
  type!: string;

  @Prop()
  department!: string;

  @Prop({ default: 'active' })
  status!: string;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: false })
  isLogged!: boolean;

  @Prop()
  authToken?: string;

  @Prop()
  failedAttempts?: number;

  @Prop()
  lockUntil?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  photoUrl?: FileObject;
}

export const AdminsSchema = SchemaFactory.createForClass(Admins);
