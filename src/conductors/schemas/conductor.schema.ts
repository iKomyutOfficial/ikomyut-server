import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Location } from '../../common/schemas/location.schema';
import { PasswordHashPlugin } from '../../common/utils/passwordHashPlugin';

@Schema({ timestamps: true })
export class Conductor {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop()
  password?: string;

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

  @Prop()
  email?: string;

  @Prop()
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

  @Prop()
  profileImage?: string;

  @Prop({ required: true })
  companyId!: string;

  @Prop()
  authToken?: string;

  @Prop()
  gender?: string;

  @Prop()
  dateHired?: Date;

  @Prop()
  employeeId?: string;

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

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export type ConductorDocument = HydratedDocument<Conductor>;

export const ConductorSchema = SchemaFactory.createForClass(Conductor);

// Set default password before hashing
ConductorSchema.pre<ConductorDocument>('save', function (next) {
  if (!this.password) {
    this.password = 'conductoR@2026!';
  }

  next();
});

// Password hashing plugin
ConductorSchema.plugin(PasswordHashPlugin);

// Indexes
ConductorSchema.index({ location: '2dsphere' });

ConductorSchema.index(
  { companyId: 1, contactNumber: 1 },
  { unique: true, sparse: true },
);

ConductorSchema.index(
  { companyId: 1, email: 1 },
  { unique: true, sparse: true },
);
