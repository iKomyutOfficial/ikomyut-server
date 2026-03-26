import { PartialType } from '@nestjs/mapped-types';
import { CreateTnvsConfigurationDto } from './create-tnvs-configuration.dto';

export class UpdateTnvsConfigurationDto extends PartialType(
  CreateTnvsConfigurationDto,
) {}
