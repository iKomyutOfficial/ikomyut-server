// otp.controller.ts

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
  constructor(
    private otpService: OtpService,
  ) {}

  @Post('requestOtp/:mobnum')
  async reqOTP(
    @Param('mobnum') mobnumRaw: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobnum = mobnumRaw.slice(-10);

    try {
      await this.otpService.sendOtpForSignup(mobnum);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
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

    try {
      await this.otpService.sendOtpForReset(mobnum);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
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

    try {
      await this.otpService.validateOtp(mobnum, code);
      return { success: true, message: 'OTP verified successfully' };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'OTP validation failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
