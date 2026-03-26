import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RainyDayService } from './rainyday.service';
import { CreateRainyDayDto } from './dto/create-rainyday.dto';
import { UpdateRainyDayDto } from './dto/update-rainyday.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Rainy Day Surcharge')
@Controller('rainy-day')
export class RainyDayController {
  constructor(private readonly service: RainyDayService) {}

  @Post()
  @ApiOperation({ summary: 'Create rainy day surcharge' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() dto: CreateRainyDayDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single record by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdateRainyDayDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
