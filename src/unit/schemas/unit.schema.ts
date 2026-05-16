import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Location } from '../../common/schemas/location.schema';

@Schema({ timestamps: true })
export class Unit {
  @Prop({ unique: true })
  unitCode?: string;

  @Prop({ required: true })
  plateNumber!: string;

  @Prop()
  bodyNumber?: string;

  @Prop()
  caseNumber?: string;

  @Prop({ required: true })
  brand!: string;

  @Prop({ required: true })
  model!: string;

  @Prop()
  seatingCapacity?: number;

  @Prop()
  companyName?: string;

  @Prop()
  companyId!: string;

  @Prop({
    required: true,
    default: 'Active',
  })
  status!: 'Active' | 'Inactive' | 'Maintenance';

  @Prop()
  lastInspectionDate?: Date;

  @Prop()
  insuranceExpiryDate?: Date;

  @Prop()
  registrationExpiryDate?: Date;

  @Prop()
  notes?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: false })
  isAssign!: boolean;

  @Prop({ type: Object })
  location?: Location;

  @Prop()
  imei?: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

// Schema
export const UnitSchema = SchemaFactory.createForClass(Unit);

// Indexes
UnitSchema.index({ unitCode: 1, companyId: 1 }, { unique: true });
UnitSchema.index({ plateNumber: 1, companyId: 1 }, { unique: true });
UnitSchema.index({ location: '2dsphere' });

// Type
export type UnitDocument = HydratedDocument<Unit>;
