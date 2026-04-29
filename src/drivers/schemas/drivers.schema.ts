import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../../common/schemas/location.schema';

@Schema({ timestamps: true })
export class Drivers {
  // ─── Auth ─────────────────────────────────────────

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'driver' })
  role!: string;

  // ─── Basic Info ───────────────────────────────────

  @Prop({ required: true })
  firstName!: string;

  @Prop()
  middleName?: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop({ unique: true, sparse: true })
  contactNumber?: string;

  // ─── Drivers Core Details ──────────────────────────

  @Prop({ unique: true, sparse: true })
  licenseNumber?: string;

  @Prop({ enum: ['Professional', 'Non-Professional'] })
  licenseType?: string;

  @Prop()
  licenseExpiry?: Date;

  // ─── Assignment ───────────────────────────────────

  @Prop()
  assignedRoute?: string;

  @Prop()
  assignedBus?: string;

  @Prop({ default: false })
  isAssign!: boolean;

  // ─── Status ───────────────────────────────────────

  @Prop({ enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' })
  status!: string;

  // ─── Location ─────────────────────────────────────

  @Prop({ type: Object })
  location?: Location;

  // ─── Profile ──────────────────────────────────────

  @Prop()
  profileImage?: string;
}

export type DriversDocument = HydratedDocument<Drivers>;
export const DriversSchema = SchemaFactory.createForClass(Drivers);

DriversSchema.pre<DriversDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

DriversSchema.index({ location: '2dsphere' });
