import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Location } from '../../common/schemas/location.schema';

@Schema({ _id: true })
export class StopOver {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ type: Object, required: true })
  location!: Location;

  @Prop({ default: false })
  P2PPU?: boolean;

  @Prop({ default: false })
  P2PDO?: boolean;
}

export const StopOverSchema = SchemaFactory.createForClass(StopOver);
