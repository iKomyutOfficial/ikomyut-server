import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Routes')
@Controller('routes')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create route' })
  @ApiResponse({ status: 201, description: 'Route created successfully' })
  create(@Body() dto: CreateRouteDto, @Req() req: any) {
    return this.routeService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'conductor')
  @ApiOperation({ summary: 'Get all routes' })
  findAll(@Req() req) {
    return this.routeService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'conductor')
  @ApiOperation({ summary: 'Get route by ID' })
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update route (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateRouteDto) {
    return this.routeService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete route' })
  remove(@Param('id') id: string) {
    return this.routeService.remove(id);
  }
}
