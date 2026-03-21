import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  private readonly logger = new Logger(OtpController.name);

  constructor(private otpService: OtpService) {}

  /**
   * Request OTP for a mobile number.
   * Works for both new users and existing users.
   */
  @Post('request/:mobnum')
  async requestOtp(
    @Param('mobnum') mobnumRaw: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobnum = mobnumRaw.slice(-10);
    this.logger.log(
      `Request OTP called for mobile number ending with: ${mobnum}`,
    );

    try {
      await this.otpService.sendOtp(mobnum); // Unified OTP send method
      this.logger.log(`OTP sent successfully to: ${mobnum}`);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP to ${mobnum}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'Failed to send OTP',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Validate OTP and determine if the user is new or existing.
   */
  @Post('validate/:mobnum/:code')
  async validateOtp(
    @Param('mobnum') mobnumRaw: string,
    @Param('code') code: string,
  ): Promise<{ success: boolean; message: string; isNewUser?: boolean }> {
    const mobnum = mobnumRaw.slice(-10);
    this.logger.log(`Validate OTP called for mobile: ${mobnum}, code: ${code}`);

    try {
      const isNewUser = await this.otpService.validateOtp(mobnum, code);
      this.logger.log(
        `OTP verified successfully for mobile: ${mobnum}. New user: ${isNewUser}`,
      );
      return { success: true, message: 'OTP verified successfully' };
    } catch (error: any) {
      this.logger.error(
        `OTP validation failed for ${mobnum}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'OTP validation failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
