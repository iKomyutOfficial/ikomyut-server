import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTrafficDto } from './dto/create-traffic.dto';
import { UpdateTrafficDto } from './dto/update-traffic.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrafficService } from './traffic-intensity.service';

@ApiTags('Traffic Intensity')
@Controller('traffic')
export class TrafficController {
  constructor(private readonly service: TrafficService) {}

  @Post()
  @ApiOperation({ summary: 'Create traffic intensity' })
  create(@Body() dto: CreateTrafficDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all records' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one record' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update record' })
  update(@Param('id') id: string, @Body() dto: UpdateTrafficDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete record' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
