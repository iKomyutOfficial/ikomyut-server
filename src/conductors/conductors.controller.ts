import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConductorService } from './conductors.service';

@ApiTags('Conductors')
@Controller('conductors')
export class ConductorController {
  constructor(private readonly service: ConductorService) {}

  @Post()
  @ApiOperation({ summary: 'Create conductor' })
  @ApiResponse({ status: 201, description: 'Conductor created successfully' })
  create(@Body() dto: CreateConductorDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all conductors' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get conductor by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update conductor' })
  update(@Param('id') id: string, @Body() dto: UpdateConductorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete conductor' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
