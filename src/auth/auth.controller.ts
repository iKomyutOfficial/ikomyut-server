import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { Admins } from '../admins/schemas/admin.schema';
import { AdminsService } from '../admins/admins.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly adminsService: AdminsService,
  ) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'Request OTP using mobile number' })
  @ApiBody({ type: RequestOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
  })
  async requestOtp(@Body() dto: RequestOtpDto) {
    this.logger.log(`OTP request initiated for mobile: ${dto.mobileNumber}`);

    try {
      const result = await this.authService.requestOtp(dto.mobileNumber);
      this.logger.log(`OTP sent successfully to mobile: ${dto.mobileNumber}`);
      return result;
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP to mobile: ${dto.mobileNumber} - ${error.message}`,
        error.stack,
      );
      throw error; // rethrow to let Nest handle the HTTP exception
    }
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and login user' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT access token or prompts registration if new user',
  })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    this.logger.log(`OTP verification attempt for mobile: ${dto.mobileNumber}`);

    try {
      const result = await this.authService.verifyOtp(
        dto.mobileNumber,
        dto.otp,
      );
      if ('access_token' in result) {
        this.logger.log(
          `OTP verified successfully for mobile: ${dto.mobileNumber}`,
        );
      } else if ('requiresRegistration' in result) {
        this.logger.warn(`Mobile ${dto.mobileNumber} requires registration`);
      }
      return result;
    } catch (error: any) {
      this.logger.error(
        `OTP verification failed for mobile: ${dto.mobileNumber} - ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login using username & password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Admin logged in successfully (returns JWT)',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async loginAdmin(@Body() loginDto: LoginDto) {
    this.logger.log(`Admin login attempt: ${loginDto.username}`);

    try {
      const result = await this.authService.loginAdmin(loginDto);

      this.logger.log(`Admin login successful: ${loginDto.username}`);
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Admin login failed for ${loginDto.username}: ${message}`,
        stack,
      );

      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login (Admin or Driver)' })
  @ApiResponse({
    status: 200,
    description: 'Login successful (returns JWT)',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`Login attempt: ${loginDto.username}`);
    try {
      const result = await this.authService.loginAdmin(loginDto);

      this.logger.log(`Admin login successful: ${loginDto.username}`);
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Admin login failed for ${loginDto.username}: ${message}`,
        stack,
      );

      throw error;
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 201, type: Admins })
  create(@Body() dto: CreateAdminDto) {
    return this.adminsService.create(dto);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Send OTP for forgot password',
  })
  @ApiBody({
    type: ForgotPasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Account not found',
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    this.logger.log(`Forgot password request for: ${dto.username}`);

    try {
      const result = await this.authService.forgotPasswordRequest(dto.username);

      this.logger.log(`Forgot password OTP sent for: ${dto.username}`);

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      const stack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Forgot password failed for ${dto.username}: ${message}`,
        stack,
      );

      throw error;
    }
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password using OTP',
  })
  @ApiBody({
    type: ResetPasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or account not found',
  })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    this.logger.log(`Reset password attempt for: ${dto.username}`);

    try {
      const result = await this.authService.resetPassword(
        dto.username,
        dto.otp,
        dto.newPassword,
      );

      this.logger.log(`Password reset successful for: ${dto.username}`);

      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      const stack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Password reset failed for ${dto.username}: ${message}`,
        stack,
      );

      throw error;
    }
  }

  @Post('verify-registration')
  @ApiOperation({
    summary: 'Verify admin registration OTP',
  })
  @ApiBody({
    type: VerifyOtpDto,
  })
  async verifyRegistration(@Body() dto: VerifyOtpDto) {
    return this.adminsService.verifyRegistrationOtp(dto.mobileNumber, dto.otp);
  }
}
