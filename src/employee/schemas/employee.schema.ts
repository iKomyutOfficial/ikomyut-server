import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Photo } from '../../common/schemas/photo.schema';

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop()
  password?: string;

  @Prop({ default: 'employee' })
  role!: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true })
  mobileNumber!: string;

  @Prop()
  position!: string;

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

  @Prop({ type: Photo })
  profilePic?: {
    name: string;
    url: string;
  };
}

export type EmployeeDocument = HydratedDocument<Employee>;
export const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Hash password only if it's provided and modified
EmployeeSchema.pre<EmployeeDocument>('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
