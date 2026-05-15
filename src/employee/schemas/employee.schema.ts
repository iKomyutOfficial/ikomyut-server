import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PasswordHashPlugin } from '../../common/utils/passwordHashPlugin';

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop()
  password?: string;

  @Prop({ default: 'employee' })
  role!: string;

  @Prop()
  email?: string;

  @Prop()
  mobileNumber!: string;

  @Prop()
  department!: string;

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

  @Prop()
  authToken?: string;

  @Prop({ default: false })
  isRegistered!: boolean;

  @Prop()
  status?: string;

  @Prop()
  address?: string;

  @Prop({ default: false })
  isOAuthUser?: boolean;

  @Prop()
  profileImage?: string;

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

export type EmployeeDocument = HydratedDocument<Employee>;

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

// Set default password before hashing
EmployeeSchema.pre<EmployeeDocument>('save', function (next) {
  if (!this.password) {
    this.password = 'sTaff@2026!';
  }

  next();
});

// Password hashing plugin
EmployeeSchema.plugin(PasswordHashPlugin);
EmployeeSchema.index(
  { companyId: 1, email: 1 },
  { unique: true, sparse: true },
);
