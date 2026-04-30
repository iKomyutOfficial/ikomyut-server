import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StopOverService } from './stopover.service';
import { CreateStopOverDto } from './dto/create-stopover.dto';
import { UpdateStopOverDto } from './dto/update-stopover.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('StopOvers')
@Controller('stopovers')
export class StopOverController {
  constructor(private readonly service: StopOverService) {}

  @Post()
  @ApiOperation({ summary: 'Create a StopOver' })
  @ApiResponse({ status: 201, description: 'StopOver created' })
  create(@Body() dto: CreateStopOverDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all StopOvers' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get StopOver by ID' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update StopOver' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  update(@Param('id') id: string, @Body() dto: UpdateStopOverDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete StopOver' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('route/:routeId')
  findByRouteId(@Param('routeId') routeId: string) {
    return this.service.findByRouteId(routeId);
  }
}
