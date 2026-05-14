import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Drivers } from './schemas/drivers.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Drivers')
@Controller('drivers')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Create driver' })
  @ApiResponse({ status: 201, description: 'Driver created', type: Drivers })
  create(@Body() dto: CreateDriverDto, @Req() req: any) {
    return this.driversService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'employee')
  findAll(@Req() req) {
    return this.driversService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'driver', 'employee')
  @ApiOperation({ summary: 'Get driver by ID' })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'driver', 'employee')
  @ApiOperation({ summary: 'Update driver' })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Delete driver' })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
