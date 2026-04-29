import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Location } from '../../common/schemas/location.schema';

@Schema({ timestamps: true })
export class Conductor {
  // ─── Auth ─────────────────────────────────────────

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'conductor' })
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

  // ─── Assignment ───────────────────────────────────

  @Prop()
  assignedRoute?: string;

  @Prop()
  assignedBus?: string;

  @Prop({ default: false })
  isAssign!: boolean;

  // ─── Status ───────────────────────────────────────

  @Prop({
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active',
  })
  status!: string;

  // ─── Device (optional but useful) ─────────────────

  @Prop()
  deviceAssigned?: string;

  // ─── Location ─────────────────────────────────────

  @Prop({ type: Object })
  location?: Location;

  // ─── Profile ──────────────────────────────────────

  @Prop()
  profileImage?: string;
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
