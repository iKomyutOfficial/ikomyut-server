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

@ApiTags('Units')
@Controller('units')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UnitController {
  constructor(private readonly service: UnitService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create unit' })
  @ApiResponse({ status: 201, description: 'Unit created successfully' })
  create(@Body() dto: CreateUnitDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all units' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get unit by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update unit (partial)' })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete unit' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
