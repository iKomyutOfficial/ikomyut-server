import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Drivers } from '../schemas/drivers.schema';
import { DriversService } from '../driver/driver.service';
import { CreateDriverDto } from '../driver/dto/create-driver.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RegisterAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateDriverStatusDto } from './dto/update-driver.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    // private readonly mobileService: MobileService,
    private readonly driversService: DriversService,
  ) {}

  // @UseGuards(ApiKeyGuard)
  @Post('register')
  register(@Body() dto: RegisterAdminDto) {
    return this.adminService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }

  @Get('employees')
  async getAllEmployees() {
    const result = await this.adminService.getAllEmployees();
    return result;
  }

  // @UseGuards(ApiKeyGuard)
  @Patch(':id/edit-information')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  // @UseGuards(ApiKeyGuard)
  @Patch(':id/change-password')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.adminService.changePassword(id, changePasswordDto);
  }

  // @UseGuards(ApiKeyGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusDto: UpdateDriverStatusDto,
  ): Promise<Drivers> {
    return this.adminService.updateDriverStatus(id, statusDto);
  }

  // @UseGuards(ApiKeyGuard)
  @Post('new-driver')
  @ApiOperation({ summary: 'Create a new driver by admin' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({ status: 201, description: 'Driver successfully created' })
  create(@Body() dto: CreateDriverDto) {
    return this.driversService.create(dto);
  }
}
