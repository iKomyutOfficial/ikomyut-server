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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SendCustomSmsDto } from './dto/send-custom-sms.dto';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  private readonly logger = new Logger(OtpController.name);

  constructor(private otpService: OtpService) {}

  /**
   * Request OTP
   */
  @Post('request/:mobileNumber')
  @ApiOperation({ summary: 'Request OTP for mobile number' })
  @ApiParam({
    name: 'mobileNumber',
    example: '09123456789',
    description: 'Mobile number',
  })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async requestOtp(
    @Param('mobileNumber') mobnumRaw: string,
  ): Promise<{ success: boolean; message: string }> {
    const mobileNumber = mobnumRaw.slice(-10);

    this.logger.log(
      `Request OTP called for mobile number ending with: ${mobileNumber}`,
    );

    try {
      await this.otpService.sendOtp(mobileNumber);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP to ${mobileNumber}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'Failed to send OTP',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Validate OTP
   */
  @Post('validate/:mobileNumber/:code')
  @ApiOperation({ summary: 'Validate OTP code' })
  @ApiParam({ name: 'mobileNumber', example: '09123456789' })
  @ApiParam({ name: 'code', example: '123456' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async validateOtp(
    @Param('mobileNumber') mobnumRaw: string,
    @Param('code') code: string,
  ): Promise<{ success: boolean; message: string; isNewUser?: boolean }> {
    const mobileNumber = mobnumRaw.slice(-10);

    this.logger.log(`Validate OTP called for mobile: ${mobileNumber}, code: ${code}`);

    try {
      const result = await this.otpService.validateOtp(mobileNumber, code);

      return {
        success: true,
        message: 'OTP verified successfully',
        isNewUser: result.isNewUser,
      };
    } catch (error: any) {
      this.logger.error(
        `OTP validation failed for ${mobileNumber}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'OTP validation failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Send Custom SMS
   */
  @Post('send-custom-sms')
  @ApiOperation({ summary: 'Send custom SMS message' })
  @ApiBody({ type: SendCustomSmsDto })
  @ApiResponse({ status: 200, description: 'SMS sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'SMS sending failed' })
  async sendCustomSms(
    @Body() dto: SendCustomSmsDto,
  ): Promise<{ success: boolean; message: string }> {
    const mobileNumber = dto.mobileNumber.slice(-10);

    this.logger.log(`Send custom SMS to mobile ending with: ${mobileNumber}`);

    try {
      await this.otpService.sendCustomSms(mobileNumber, dto.message);

      return {
        success: true,
        message: 'SMS sent successfully',
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to send SMS to ${mobileNumber}: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        error.message || 'Failed to send SMS',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
