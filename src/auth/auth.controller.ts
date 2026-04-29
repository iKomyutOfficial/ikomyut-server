import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'Request OTP using mobile number' })
  @ApiBody({ type: RequestOtpDto })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
  })
  async requestOtp(@Body() dto: RequestOtpDto) {
    this.logger.log(`OTP request initiated for mobile: ${dto.mobnum}`);

    try {
      const result = await this.authService.requestOtp(dto.mobnum);
      this.logger.log(`OTP sent successfully to mobile: ${dto.mobnum}`);
      return result;
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP to mobile: ${dto.mobnum} - ${error.message}`,
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
    this.logger.log(`OTP verification attempt for mobile: ${dto.mobnum}`);

    try {
      const result = await this.authService.verifyOtp(dto.mobnum, dto.otp);
      if ('access_token' in result) {
        this.logger.log(`OTP verified successfully for mobile: ${dto.mobnum}`);
      } else if ('requiresRegistration' in result) {
        this.logger.warn(`Mobile ${dto.mobnum} requires registration`);
      }
      return result;
    } catch (error: any) {
      this.logger.error(
        `OTP verification failed for mobile: ${dto.mobnum} - ${error.message}`,
        error.stack,
      );
      throw error; // rethrow to let Nest handle the HTTP exception
    }
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login using username & password' })
  @ApiBody({
    schema: {
      example: {
        username: 'admin1',
        password: 'password123',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Admin logged in successfully (returns JWT)',
  })
  async loginAdmin(@Body() body: { username: string; password: string }) {
    this.logger.log(`Admin login attempt: ${body.username}`);

    try {
      const result = await this.authService.loginAdmin(
        body.username,
        body.password,
      );

      this.logger.log(`Admin login successful: ${body.username}`);
      return result;
    } catch (error: any) {
      this.logger.error(
        `Admin login failed for ${body.username}: ${error.message}`,
        error.stack,
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
  async login(@Body() body: LoginDto) {
    this.logger.log(`Login attempt: ${body.username}`);
    const result = await this.authService.login(body.username, body.password);
    this.logger.log(`Login successful: ${body.username}`);
    return result;
  }
}
