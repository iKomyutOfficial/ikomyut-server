import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Location } from '../../common/schemas/location.schema';
import { PasswordHashPlugin } from '../../common/utils/passwordHashPlugin';

@Schema({ timestamps: true })
export class Drivers {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop()
  password?: string;

  @Prop({ default: 'driver' })
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
  licenseNumber?: string;

  @Prop({ enum: ['Professional', 'Non-Professional'] })
  licenseType?: string;

  @Prop()
  licenseExpiry?: Date;

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

export type DriversDocument = HydratedDocument<Drivers>;

export const DriversSchema = SchemaFactory.createForClass(Drivers);

// Set default password before hashing
DriversSchema.pre<DriversDocument>('save', function (next) {
  if (!this.password) {
    this.password = 'driverR@2026!';
  }

  next();
});

// Hash password plugin
DriversSchema.plugin(PasswordHashPlugin);

// Indexes
DriversSchema.index({ location: '2dsphere' });

DriversSchema.index(
  { companyId: 1, contactNumber: 1 },
  { unique: true, sparse: true },
);

DriversSchema.index({ companyId: 1, email: 1 }, { unique: true, sparse: true });

DriversSchema.index(
  { companyId: 1, licenseNumber: 1 },
  { unique: true, sparse: true },
);
