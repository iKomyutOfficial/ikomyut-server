import { Prop } from "@nestjs/mongoose";

export class Photo {
  @Prop()
  name!: string;

  @Prop()
  url!: string;
}
