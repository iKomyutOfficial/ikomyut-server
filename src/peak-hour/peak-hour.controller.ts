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
import { PeakHourService } from './peak-hour.service';
import { CreatePeakHourDto } from './dto/create-peak-hour.dto';
import { UpdatePeakHourDto } from './dto/update-peak-hour.dto';

@ApiTags('Peak Hour')
@Controller('peak-hour')
export class PeakHourController {
  constructor(private readonly peakHourService: PeakHourService) {}

  @Post()
  @ApiOperation({ summary: 'Create a peak hour record' })
  @ApiResponse({
    status: 201,
    description: 'Peak hour record created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request payload',
  })
  create(@Body() createPeakHourDto: CreatePeakHourDto) {
    return this.peakHourService.create(createPeakHourDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all peak hour records' })
  @ApiResponse({
    status: 200,
    description: 'Peak hour records retrieved successfully',
  })
  findAll() {
    return this.peakHourService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one peak hour record by ObjectId' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the PeakHour document',
    example: '67cfb3a8c9e123456789abcd',
  })
  @ApiResponse({
    status: 200,
    description: 'Peak hour record retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Peak hour record not found',
  })
  findOne(@Param('id') id: string) {
    return this.peakHourService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one peak hour record by ObjectId' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the PeakHour document',
    example: '67cfb3a8c9e123456789abcd',
  })
  @ApiResponse({
    status: 200,
    description: 'Peak hour record updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Peak hour record not found',
  })
  update(
    @Param('id') id: string,
    @Body() updatePeakHourDto: UpdatePeakHourDto,
  ) {
    return this.peakHourService.update(id, updatePeakHourDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one peak hour record by ObjectId' })
  @ApiParam({
    name: 'id',
    description: 'MongoDB ObjectId of the PeakHour document',
    example: '67cfb3a8c9e123456789abcd',
  })
  @ApiResponse({
    status: 200,
    description: 'Peak hour record deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Peak hour record not found',
  })
  remove(@Param('id') id: string) {
    return this.peakHourService.remove(id);
  }
}