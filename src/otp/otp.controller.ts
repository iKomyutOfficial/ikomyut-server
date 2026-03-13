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

  @Post('requestOtp/:mobnum')
  async reqOTP(
    @Param('mobnum') mobnumRaw: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobnum = mobnumRaw.slice(-10);
    this.logger.log(
      `Request OTP called for mobile number ending with: ${mobnum}`,
    );

    try {
      await this.otpService.sendOtpForSignup(mobnum);
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

  @Post('requestOtpReset/:mobnum')
  async reqOTPReset(
    @Param('mobnum') mobnumRaw: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobnum = mobnumRaw.slice(-10);
    this.logger.log(
      `Request OTP Reset called for mobile number ending with: ${mobnum}`,
    );

    try {
      await this.otpService.sendOtpForReset(mobnum);
      this.logger.log(`OTP Reset sent successfully to: ${mobnum}`);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP Reset to ${mobnum}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'Failed to send OTP',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('requestOtpResetAdmin/:mobnum')
  // async reqOTPResetAdmin(
  //   @Param('mobnum') mobnumRaw: string,
  // ): Promise<{ success: boolean; message: string }> {
  //   const mobnum = mobnumRaw.slice(-10);

  //   try {
  //     await this.otpService.sendOtpForResetAdmin(mobnum);
  //     return { success: true, message: 'OTP sent successfully' };
  //   } catch (error: any) {
  //     throw new HttpException(
  //       error.message || 'Failed to send OTP',
  //       error.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post('validate/:mobnum/:code')
  async validateOtp(
    @Param('mobnum') mobnumRaw: string,
    @Param('code') code: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobnum = mobnumRaw.slice(-10);
    this.logger.log(`Validate OTP called for mobile: ${mobnum}, code: ${code}`);

    try {
      await this.otpService.validateOtp(mobnum, code);
      this.logger.log(`OTP verified successfully for mobile: ${mobnum}`);
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
