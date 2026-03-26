import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TimeMatrixService } from './time-matrix.service';
import { CreateTimeMatrixDto } from './dto/create-time-matrix.dto';
import { UpdateTimeMatrixDto } from './dto/update-time-matrix.dto';
import { TimeMatrix } from '../schemas/time-matrix.schema';

@ApiTags('Time Matrix')
@Controller('time-matrix')
export class TimeMatrixController {
  constructor(private readonly timeMatrixService: TimeMatrixService) { }

  @Post()
  @ApiOperation({ summary: 'Create entry' })
  @ApiResponse({ status: 201, type: TimeMatrix })
  create(@Body() createDto: CreateTimeMatrixDto) {
    return this.timeMatrixService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entries' })
  @ApiResponse({ status: 200, type: [TimeMatrix] })
  findAll() {
    return this.timeMatrixService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get entry by ID' })
  findOne(@Param('id') id: string) {
    return this.timeMatrixService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update entry' })
  update(@Param('id') id: string, @Body() updateDto: UpdateTimeMatrixDto) {
    return this.timeMatrixService.update(id, updateDto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete entry' })
  // remove(@Param('id') id: string) {
  //   return this.timeMatrixService.remove(id);
  // }
}