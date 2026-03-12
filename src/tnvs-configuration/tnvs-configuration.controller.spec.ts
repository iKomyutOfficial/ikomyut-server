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

  @Get(':objectId')
  @ApiOperation({ summary: 'Get one TNVS configuration record by ObjectId' })
  @ApiParam({
    name: 'objectId',
    description: 'MongoDB ObjectId of the TnvsConfiguration document',
    example: '65f2b1c9e4b0f1a2d3c4e5f6',
  })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration record retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'TNVS configuration record not found',
  })
  findOne(@Param('objectId') objectId: string) {
    return this.tnvsConfigurationService.findOne(objectId);
  }

  @Patch(':objectId')
  @ApiOperation({ summary: 'Update one TNVS configuration record by ObjectId' })
  @ApiParam({
    name: 'objectId',
    description: 'MongoDB ObjectId of the TnvsConfiguration document',
    example: '65f2b1c9e4b0f1a2d3c4e5f6',
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
    @Param('objectId') objectId: string,
    @Body() updateTnvsConfigurationDto: UpdateTnvsConfigurationDto,
  ) {
    return this.tnvsConfigurationService.update(
      objectId,
      updateTnvsConfigurationDto,
    );
  }

  @Delete(':objectId')
  @ApiOperation({ summary: 'Delete one TNVS configuration record by ObjectId' })
  @ApiParam({
    name: 'objectId',
    description: 'MongoDB ObjectId of the TnvsConfiguration document',
    example: '65f2b1c9e4b0f1a2d3c4e5f6',
  })
  @ApiResponse({
    status: 200,
    description: 'TNVS configuration record deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'TNVS configuration record not found',
  })
  remove(@Param('objectId') objectId: string) {
    return this.tnvsConfigurationService.remove(objectId);
  }
}