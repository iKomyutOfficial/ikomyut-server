import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TnvsConfigurationService } from './tnvs-configuration.service';
import { CreateTnvsConfigurationDto } from './dto/create-tnvs-configuration.dto';
import { UpdateTnvsConfigurationDto } from './dto/update-tnvs-configuration.dto';

@ApiTags('Tnvs Configuration')
@Controller('tnvs-configuration')
export class TnvsConfigurationController {
  constructor(
    private readonly tnvsConfigurationService: TnvsConfigurationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a TNVS configuration record' })
  @ApiResponse({
    status: 201,
    description: 'TNVS configuration record created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request payload',
  })
  create(@Body() createTnvsConfigurationDto: CreateTnvsConfigurationDto) {
    return this.tnvsConfigurationService.create(createTnvsConfigurationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all TNVS configuration records' })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration records retrieved successfully',
  })
  findAll() {
    return this.tnvsConfigurationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one TNVS configuration record by custom id' })
  @ApiParam({
    name: 'id',
    description: 'Custom id field from the TnvsConfiguration schema',
    example: 'TC001',
  })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration record retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'TNVS configuration record not found',
  })
  findOne(@Param('id') id: string) {
    return this.tnvsConfigurationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one TNVS configuration record by custom id' })
  @ApiParam({
    name: 'id',
    description: 'Custom id field from the TnvsConfiguration schema',
    example: 'TC001',
  })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration record updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'TNVS configuration record not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateTnvsConfigurationDto: UpdateTnvsConfigurationDto,
  ) {
    return this.tnvsConfigurationService.update(id, updateTnvsConfigurationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one TNVS configuration record by custom id' })
  @ApiParam({
    name: 'id',
    description: 'Custom id field from the TnvsConfiguration schema',
    example: 'TC001',
  })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration record deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'TNVS configuration record not found',
  })
  remove(@Param('id') id: string) {
    return this.tnvsConfigurationService.remove(id);
  }
}