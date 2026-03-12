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

  @Get(':objectId')
findOne(@Param('objectId') objectId: string) {
  return this.service.findOne(objectId);
}

@Patch(':objectId')
update(@Param('objectId') objectId: string, @Body() dto: UpdateTrafficIntensityDto) {
  return this.service.update(objectId, dto);
}

@Delete(':objectId')
remove(@Param('objectId') objectId: string) {
  return this.service.remove(objectId);
}
}