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
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ConductorService } from './conductors.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Conductors')
@Controller('conductors')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ConductorController {
  constructor(private readonly conductorsService: ConductorService) {}

  @Post()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Create conductor' })
  @ApiResponse({ status: 201, description: 'Conductor created successfully' })
  create(@Body() dto: CreateConductorDto, @Req() req: any) {
    return this.conductorsService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Get all conductors' })
  findAll(@Req() req) {
    return this.conductorsService.findAll(req.user);
  }

  @Get(':id')
  @Roles('admin', 'conductor', 'employee')
  @ApiOperation({ summary: 'Get conductor by ID' })
  findOne(@Param('id') id: string) {
    return this.conductorsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'conductor', 'employee')
  @ApiOperation({ summary: 'Partially update conductor' })
  update(@Param('id') id: string, @Body() dto: UpdateConductorDto) {
    return this.conductorsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'conductor', 'employee')
  @ApiOperation({ summary: 'Delete conductor' })
  remove(@Param('id') id: string) {
    return this.conductorsService.remove(id);
  }
}
