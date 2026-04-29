import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaintenancePart } from './maintenance-part.schema';

@Schema({ _id: false })
export class MaintenanceRecord {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  description!: string;

  @Prop()
  mechanic?: string;

  @Prop({ type: [MaintenancePart], default: [] })
  parts!: MaintenancePart[];

  @Prop({ default: 0 })
  laborCost!: number;

  @Prop({ default: 0 })
  totalCost!: number;

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const MaintenanceRecordSchema =
  SchemaFactory.createForClass(MaintenanceRecord);
