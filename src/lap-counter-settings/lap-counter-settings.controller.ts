import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LapCounterSettingsService } from './lap-counter-settings.service';
import { CreateLapCounterSettingsDto } from './dto/create-lap-counter-settings.dto';
import { UpdateLapCounterSettingsDto } from './dto/update-lap-counter-settings.dto';
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

@ApiTags('Lap Counter Settings')
@Controller('lap-counter-settings')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LapCounterSettingsController {
  constructor(private readonly lapService: LapCounterSettingsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create lap counter settings' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() dto: CreateLapCounterSettingsDto, @Req() req: any) {
    return this.lapService.create(dto, req.user);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all settings' })
  findAll(@Req() req) {
    return this.lapService.findAll(req.user);
  }

  @Get('account/:account')
  @Roles('admin')
  @ApiOperation({ summary: 'Get settings by account' })
  @ApiParam({ name: 'account', example: 'account-001' })
  findByAccount(@Param('account') account: string) {
    return this.lapService.findByAccount(account);
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get settings by ID' })
  findOne(@Param('id') id: string) {
    return this.lapService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update settings' })
  update(@Param('id') id: string, @Body() dto: UpdateLapCounterSettingsDto) {
    return this.lapService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete settings' })
  remove(@Param('id') id: string) {
    return this.lapService.remove(id);
  }
}
