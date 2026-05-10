import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../../common/schemas/location.schema';
import { Photo } from '../../common/schemas/photo.schema';
import { PasswordHashPlugin } from '../../common/utils/passwordHashPlugin';

@Schema({ timestamps: true })
export class Conductor {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'conductor' })
  role!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop()
  middleName?: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop()
  address?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true })
  contactNumber?: string;

  @Prop()
  assignedRoute?: string;

  @Prop()
  assignedBus?: string;

  @Prop({ default: false })
  isAssign!: boolean;

  @Prop({
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  })
  status!: string;

  @Prop()
  deviceAssigned?: string;

  @Prop({ type: Object })
  location?: Location;

  @Prop({ type: Photo })
  profilePic?: {
    name: string;
    url: string;
  };

  @Prop({ required: true })
  companyId!: string;

  @Prop({ default: null })
  currentSession?: string;

  @Prop()
  authToken?: string;

  @Prop()
  gender?: string;
  
  @Prop()
  dateHired?: Date;

  @Prop()
  employmentType?: string;

  @Prop()
  sssNumber?: string;

  @Prop()
  philhealthNumber?: string;

  @Prop()
  pagibigNumber?: string;

  @Prop()
  emergencyContactName?: string;

  @Prop()
  emergencyContactNumber?: string;

  @Prop()
  emergencyContactRelationship?: string;
}

export type ConductorDocument = HydratedDocument<Conductor>;
export const ConductorSchema = SchemaFactory.createForClass(Conductor);
ConductorSchema.plugin(PasswordHashPlugin);
ConductorSchema.index({ location: '2dsphere' });
