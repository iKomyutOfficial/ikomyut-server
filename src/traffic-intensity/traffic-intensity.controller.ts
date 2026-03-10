import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TrafficIntensityService } from './traffic-intensity.service';
import { CreateTrafficIntensityDto } from './dto/create-traffic-intensity.dto';
import { UpdateTrafficIntensityDto } from './dto/update-traffic-intensity.dto';

@Controller('traffic-intensity')
export class TrafficIntensityController {
  constructor(private readonly service: TrafficIntensityService) {}

  @Post()
  create(@Body() dto: CreateTrafficIntensityDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrafficIntensityDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}