import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileObjectSchema } from './file-object.schema';
import type { FileObject } from './file-object.schema';

@Schema({ _id: false })
export class VehicleOwnership {
  @Prop({ default: '' })
  ownershipId?: string;

  @Prop({ default: '' })
  description?: string;

  @Prop({ default: '' })
  operatorsFullName?: string;

  @Prop({ default: '' })
  operatorsAddress?: string;

  @Prop({ default: '' })
  operatorsMobileNumber?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  operatorDocuments?: FileObject;
}

export const VehicleOwnershipSchema =
  SchemaFactory.createForClass(VehicleOwnership);

@Schema({ _id: false })
export class TransportRequirements {
  @Prop({ type: VehicleOwnershipSchema, default: {} })
  vehicleOwnership?: VehicleOwnership;

  @Prop({ default: '' })
  plateNumber?: string;

  @Prop({ default: '' })
  orNumber?: string;

  @Prop({ default: '' })
  crNumber?: string;

  @Prop({ default: '' })
  carColor?: string;

  @Prop({ default: '' })
  carBrand?: string;

  @Prop({ default: '' })
  carModel?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  ownerDocuments?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  operatorsDocument?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  vehicleOR?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  vehicleCR?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  vehicleSalesInvoice?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  authorizationLetterPageOne?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  authorizationLetterPageTwo?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  sPAPageOne?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  sPAPageTwo?: FileObject;

  @Prop({ default: '' })
  ltfrbDocType?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  pAPageOne?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  pAPageTwo?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  cPCPageOne?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  cPCPageTwo?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  mEPAPageOne?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  mEPAPageTwo?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  pAMI?: FileObject;
}

export const TransportRequirementsSchema = SchemaFactory.createForClass(
  TransportRequirements,
);
