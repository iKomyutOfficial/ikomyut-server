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
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { RequestWithCompany } from '../types/request';

@ApiTags('Units')
@Controller('units')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Create unit' })
  @ApiResponse({ status: 201, description: 'Unit created successfully' })
  create(@Body() dto: CreateUnitDto, @Req() req: any) {
    return this.unitService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get all units' })
  findAll(@Req() req) {
    return this.unitService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get unit by ID' })
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Update unit (partial)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUnitDto,
    @Req() req: RequestWithCompany,
  ) {
    return this.unitService.update(id, dto, req);
  }

  @Delete(':id')
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Delete unit' })
  remove(@Param('id') id: string) {
    return this.unitService.remove(id);
  }
}
