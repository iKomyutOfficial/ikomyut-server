import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(private readonly service: UnitService) {}

  @Post()
  @ApiOperation({ summary: 'Create unit' })
  @ApiResponse({ status: 201, description: 'Unit created successfully' })
  create(@Body() dto: CreateUnitDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all units' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update unit (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete unit' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
