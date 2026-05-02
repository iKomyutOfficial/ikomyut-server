import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StopOverService } from './stopover.service';
import { CreateStopOverDto } from './dto/create-stopover.dto';
import { UpdateStopOverDto } from './dto/update-stopover.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('StopOvers')
@Controller('stopovers')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StopOverController {
  constructor(private readonly service: StopOverService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a StopOver' })
  @ApiResponse({ status: 201, description: 'StopOver created' })
  create(@Body() dto: CreateStopOverDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all StopOvers' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get StopOver by ID' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update StopOver' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  update(@Param('id') id: string, @Body() dto: UpdateStopOverDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete StopOver' })
  @ApiParam({ name: 'id', description: 'StopOver ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('route/:routeId')
  @Roles('admin')
  findByRouteId(@Param('routeId') routeId: string) {
    return this.service.findByRouteId(routeId);
  }
}
