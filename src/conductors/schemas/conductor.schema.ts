import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../../common/schemas/location.schema';
import { Photo } from '../../common/schemas/photo.schema';

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
  bday?: string;

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
}

export type ConductorDocument = HydratedDocument<Conductor>;
export const ConductorSchema = SchemaFactory.createForClass(Conductor);

// Hash password before saving
ConductorSchema.pre<ConductorDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Geospatial index
ConductorSchema.index({ location: '2dsphere' });
