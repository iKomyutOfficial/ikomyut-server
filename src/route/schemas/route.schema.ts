import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StopOver } from '../../stopover/schemas/stopover.schema';

@Schema({ timestamps: true })
export class Route {
  @Prop({ unique: true, required: true })
  routeId!: string;

  @Prop({ required: true })
  terminalPointA!: string;

  @Prop({ required: true })
  terminalPointB!: string;

  @Prop()
  companyName?: string;

  @Prop()
  companyId!: string;

  @Prop()
  fareP2P?: number;

  @Prop()
  minFare?: number;

  @Prop()
  fixedDistance?: number;

  @Prop({ default: false })
  isAssign?: boolean;

  @Prop()
  status?: string;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export type RouteDocument = HydratedDocument<Route>;
export const RouteSchema = SchemaFactory.createForClass(Route);

// Geo index
RouteSchema.index({ 'stopOver.location': '2dsphere' });
