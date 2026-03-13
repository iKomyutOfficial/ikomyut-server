import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { RainyDaySurchargeService } from './rainy-day-surcharge.service';
import { CreateRainyDaySurchargeDto } from './dto/create-rainy-day-surcharge.dto';
import { UpdateRainyDaySurchargeDto } from './dto/update-rainy-day-surcharge.dto';

@ApiTags('RainyDaySurcharge')
@Controller('rainy-day-surcharge')
export class RainyDaySurchargeController {
  constructor(private readonly service: RainyDaySurchargeService) {}

  @Post()
  @ApiOperation({ summary: 'Create new rainy day surcharge' })
  create(@Body() createDto: CreateRainyDaySurchargeDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rainy day surcharges with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(Number(page), Number(limit));
  }

  @Get(':objectId')
  @ApiOperation({ summary: 'Get a rainy day surcharge by objectId' })
  findOne(@Param('objectId') objectId: string) {
    return this.service.findOne(objectId);
  }

  @Patch(':objectId')
  @ApiOperation({ summary: 'Update rainy day surcharge' })
  update(
    @Param('objectId') objectId: string,
    @Body() updateDto: UpdateRainyDaySurchargeDto,
  ) {
    return this.service.update(objectId, updateDto);
  }

  @Delete(':objectId')
  @ApiOperation({ summary: 'Delete a rainy day surcharge' })
  remove(@Param('objectId') objectId: string) {
    return this.service.remove(objectId);
  }
}
