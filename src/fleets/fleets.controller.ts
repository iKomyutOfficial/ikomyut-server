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
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FleetService } from './fleets.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Fleets')
@Controller('fleet')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create fleet record' })
  @ApiResponse({ status: 201, description: 'Fleet created successfully' })
  create(@Body() dto: CreateFleetDto, @Req() req: any) {
    return this.fleetService.create(dto, req.user);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all fleet records' })
  findAll(@Req() req) {
    return this.fleetService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'conductor')
  @ApiOperation({ summary: 'Get fleet by ID' })
  findOne(@Param('id') id: string) {
    return this.fleetService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'conductor')
  @ApiOperation({ summary: 'Update fleet (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateFleetDto) {
    return this.fleetService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'conductor')
  @ApiOperation({ summary: 'Delete fleet' })
  remove(@Param('id') id: string) {
    return this.fleetService.remove(id);
  }
}
