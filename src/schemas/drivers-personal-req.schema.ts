import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FileObjectSchema } from './file-object.schema';
import type { FileObject } from './file-object.schema';

@Schema({ _id: false })
export class PersonalRequirements {
  @Prop({ type: FileObjectSchema, default: {} })
  profilePicture?: FileObject;

  @Prop({ default: '' })
  nationality?: string;

  @Prop({ default: 0 })
  pwd!: number;

  @Prop({ type: FileObjectSchema, default: {} })
  pwdFile?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  vaccinationCertificate?: FileObject;

  @Prop({ default: false })
  vaccinationCertificateConsent!: boolean;

  @Prop({ default: '' })
  emergencyContactName?: string;

  @Prop({ default: '' })
  emergencyContactAddress?: string;

  @Prop({ default: '' })
  emergencyContactMobNum?: string;

  @Prop({ default: '' })
  emergencyRelationship?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  driverLicenseFront?: FileObject;

  @Prop({ type: FileObjectSchema, default: {} })
  driverLicenseBack?: FileObject;

  @Prop({ default: '' })
  driverLicenseNumber?: string;

  @Prop({ default: '' })
  driverLicenseExpDate?: string;

  @Prop({ default: '' })
  documentType?: string;

  @Prop({ type: FileObjectSchema, default: {} })
  documentImg?: FileObject;

  @Prop({ default: false })
  privacyNotice!: boolean;

  @Prop({ default: false })
  codeOfConduct!: boolean;

  @Prop({ default: false })
  termsOfService!: boolean;

  @Prop({ default: false })
  declarations!: boolean;
}

export const PersonalRequirementsSchema =
  SchemaFactory.createForClass(PersonalRequirements);
