import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Fleet {
  @Prop({ required: true })
  assignUnitCode!: string;

  @Prop()
  companyId!: string;

  @Prop()
  assignedRouteId!: string;

  @Prop()
  assignedRouteIdOne!: string;

  @Prop()
  assignedDriverId!: string;

  @Prop()
  assignedConductorId!: string;

  @Prop({ type: Date, default: null })
  archivedAt?: Date;

  @Prop()
  status!: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

// Create schema
export const FleetSchema = SchemaFactory.createForClass(Fleet);

// Use HydratedDocument instead of Document
export type FleetDocument = HydratedDocument<Fleet>;
