import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GPSDeviceService } from './gps-device.service';
import { CreateGPSDeviceDto } from './dto/create-gps-device.dto';
import { UpdateGPSDeviceDto } from './dto/update-gps-device.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('GPS Devices')
@Controller('gps-devices')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GPSDeviceController {
  constructor(private readonly service: GPSDeviceService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create GPS device' })
  @ApiResponse({ status: 201, description: 'Device created successfully' })
  create(@Body() dto: CreateGPSDeviceDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all GPS devices' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get GPS device by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update GPS device' })
  update(@Param('id') id: string, @Body() dto: UpdateGPSDeviceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete GPS device' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('imei/:imei')
  @Roles('admin')
  @ApiOperation({ summary: 'Get GPS device by IMEI' })
  @ApiParam({
    name: 'imei',
    example: '123456789012345',
    description: 'Unique device IMEI number',
  })
  @ApiResponse({ status: 200, description: 'Device found' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  findByImei(@Param('imei') imei: string) {
    return this.service.findByImei(imei);
  }
}
