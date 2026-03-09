import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Drivers } from '../schemas/drivers.schema';
import { DriversService } from './driver.service';

@ApiTags('Drivers') // Groups all endpoints under "Drivers" in Swagger UI
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new driver' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 201,
    description: 'Driver created successfully',
    type: Drivers,
  })
  create(@Body() createDriverDto: CreateDriverDto): Promise<Drivers> {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({ status: 200, description: 'List of drivers', type: [Drivers] })
  findAll(): Promise<Drivers[]> {
    return this.driversService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiResponse({ status: 200, description: 'Driver found', type: Drivers })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  findOne(@Param('id') id: string): Promise<Drivers> {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiBody({ type: UpdateDriverDto })
  @ApiResponse({
    status: 200,
    description: 'Driver updated successfully',
    type: Drivers,
  })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Drivers> {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiResponse({ status: 200, description: 'Driver deleted successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.driversService.remove(id);
  }

  @Get('mobile/:mobnum')
  @ApiOperation({ summary: 'Find driver by mobile number' })
  @ApiParam({
    name: 'mobnum',
    description: 'Driver mobile number',
    example: '09123456789',
  })
  @ApiResponse({
    status: 200,
    description: 'Driver found',
    type: Drivers,
  })
  @ApiResponse({
    status: 404,
    description: 'Driver not found',
  })
  findByMobnum(@Param('mobnum') mobnum: string) {
    return this.driversService.findByMobnum(mobnum);
  }
}
