import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { TnvsConfigurationService } from './tnvs-configuration.service';
import { CreateTnvsConfigurationDto } from './dto/create-tnvs-configuration.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateTnvsConfigurationDto } from './dto/update-tnvs-configuration.dto';

@ApiTags('tnvs-configuration')
@Controller('tnvs-configuration')
export class TnvsConfigurationController {
  constructor(private readonly tnvsService: TnvsConfigurationService) {}

  @Post()
  @ApiOperation({ summary: 'Create TNVS configuration' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createDto: CreateTnvsConfigurationDto) {
    return this.tnvsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all configurations' })
  findAll() {
    return this.tnvsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get configuration by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.tnvsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update configuration' })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTnvsConfigurationDto,
  ) {
    return this.tnvsService.update(id, updateDto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete configuration' })
  // @ApiParam({ name: 'id', type: String })
  // remove(@Param('id') id: string) {
  //   return this.tnvsService.remove(id);
  // }
}
