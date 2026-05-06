import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LapRecordService } from './lap-record.service';
import { CreateLapRecordDto } from './dto/create-lap-record.dto';
import { UpdateLapRecordDto } from './dto/update-lap-record.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Lap Records')
@Controller('lap-records')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LapRecordController {
  constructor(private readonly recordService: LapRecordService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create lap record' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() dto: CreateLapRecordDto, @Req() req: any) {
    return this.recordService.create(dto, req.user);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all lap records' })
  findAll(@Req() req) {
    return this.recordService.findAll(req.user);
  }

  @Get('device')
  @Roles('admin')
  @ApiOperation({ summary: 'Get records by device' })
  @ApiQuery({ name: 'account', example: 'account-001' })
  @ApiQuery({ name: 'deviceImei', example: '356938035643809' })
  findByDevice(
    @Query('account') account: string,
    @Query('deviceImei') deviceImei: string,
  ) {
    return this.recordService.findByDevice(account, deviceImei);
  }

  @Get('geofence')
  @Roles('admin')
  @ApiOperation({ summary: 'Get records by geofence' })
  @ApiQuery({ name: 'account', example: 'account-001' })
  @ApiQuery({ name: 'geofenceId', example: 'geo-12345' })
  findByGeofence(
    @Query('account') account: string,
    @Query('geofenceId') geofenceId: string,
  ) {
    return this.recordService.findByGeofence(account, geofenceId);
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get lap record by ID' })
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update lap record' })
  update(@Param('id') id: string, @Body() dto: UpdateLapRecordDto) {
    return this.recordService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete lap record' })
  remove(@Param('id') id: string) {
    return this.recordService.remove(id);
  }
}
