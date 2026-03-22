import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
  Delete,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Drivers } from '../schemas/drivers.schema';
import { DriversService } from '../driver/driver.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateDriverStatusDto } from './dto/update-driver.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateDriverDto } from '../driver/dto/update-driver.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth('access-token')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(
    private readonly adminService: AdminService,
    private readonly driversService: DriversService,
  ) {}

  @Post('new-admin')
  register(@Body() dto: RegisterAdminDto) {
    return this.adminService.register(dto);
  }

  @Get('employees')
  async getAllEmployees() {
    const result = await this.adminService.getAllEmployees();
    return result;
  }

  @Patch(':id/edit-information')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.adminService.changePassword(id, changePasswordDto);
  }
}
