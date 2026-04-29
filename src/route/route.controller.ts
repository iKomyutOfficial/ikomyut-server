import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Routes')
@Controller('routes')
export class RouteController {
  constructor(private readonly service: RouteService) {}

  @Post()
  @ApiOperation({ summary: 'Create route' })
  @ApiResponse({ status: 201, description: 'Route created successfully' })
  create(@Body() dto: CreateRouteDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all routes' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get route by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update route (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateRouteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete route' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
