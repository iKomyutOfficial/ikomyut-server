import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FleetService } from './fleets.service';

@ApiTags('Fleets')
@Controller('fleet')
export class FleetController {
  constructor(private readonly service: FleetService) {}

  @Post()
  @ApiOperation({ summary: 'Create fleet record' })
  @ApiResponse({ status: 201, description: 'Fleet created successfully' })
  create(@Body() dto: CreateFleetDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fleet records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fleet by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update fleet (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateFleetDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete fleet' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
