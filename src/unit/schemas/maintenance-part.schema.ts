import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class MaintenancePart {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 1 })
  quantity!: number;

  @Prop({ default: 0 })
  cost!: number;
}

export const MaintenancePartSchema =
  SchemaFactory.createForClass(MaintenancePart);
