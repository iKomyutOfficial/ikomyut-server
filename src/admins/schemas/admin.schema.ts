import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Admins {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop()
  password?: string;

  @Prop({ default: 'admin' })
  role!: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true })
  mobileNumber!: string;

  @Prop()
  firstName!: string;

  @Prop()
  middleName?: string;

  @Prop()
  lastName!: string;

  @Prop({ required: true })
  companyName!: string;

  @Prop({ required: true })
  companyId!: string;

  @Prop({ default: null })
  currentSession?: string;

  @Prop({ default: false })
  isRegistered!: boolean;

  @Prop()
  status?: string;

  @Prop({ default: false })
  isOAuthUser?: boolean;

  @Prop()
  authToken?: string;

  @Prop()
  profileImage?: string;
}

export type AdminsDocument = HydratedDocument<Admins>;
export const AdminsSchema = SchemaFactory.createForClass(Admins);

// Hash password only if it's provided and modified
AdminsSchema.pre<AdminsDocument>('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
