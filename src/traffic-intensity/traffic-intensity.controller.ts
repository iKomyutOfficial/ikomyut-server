import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TrafficIntensityService } from './traffic-intensity.service';
import { CreateTrafficIntensityDto } from './dto/create-traffic-intensity.dto';
import { UpdateTrafficIntensityDto } from './dto/update-traffic-intensity.dto';

@ApiTags('Traffic Intensity')
@Controller('traffic-intensity')
export class TrafficIntensityController {
  constructor(private readonly service: TrafficIntensityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a traffic intensity record' })
  @ApiResponse({
    status: 201,
    description: 'Traffic intensity record created successfully',
  })
  create(@Body() dto: CreateTrafficIntensityDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all traffic intensity records' })
  @ApiResponse({
    status: 200,
    description: 'Traffic intensity records retrieved successfully',
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':objectId')
  @ApiOperation({ summary: 'Get one traffic intensity record by id' })
  @ApiParam({
    name: 'objectId',
    description: 'Mongo document id',
    example: '67d2a4904f3d615a11de0a31',
  })
  @ApiResponse({
    status: 200,
    description: 'Traffic intensity record retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Traffic intensity record not found',
  })
  findById(@Param('objectId') objectId: string) {
    return this.service.findById(objectId);
  }

  @Patch(':objectId')
  @ApiOperation({ summary: 'Update one traffic intensity record by id' })
  @ApiParam({
    name: 'objectId',
    description: 'Mongo document id',
    example: '67d2a4904f3d615a11de0a31',
  })
  @ApiResponse({
    status: 200,
    description: 'Traffic intensity record updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Traffic intensity record not found',
  })
  update(
    @Param('objectId') objectId: string,
    @Body() dto: UpdateTrafficIntensityDto,
  ) {
    return this.service.update(objectId, dto);
  }

  @Delete(':objectId')
  @ApiOperation({ summary: 'Delete one traffic intensity record by id' })
  @ApiParam({
    name: 'objectId',
    description: 'Mongo document id',
    example: '67d2a4904f3d615a11de0a31',
  })
  @ApiResponse({
    status: 200,
    description: 'Traffic intensity record deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Traffic intensity record not found',
  })
  remove(@Param('objectId') objectId: string) {
    return this.service.remove(objectId);
  }
}