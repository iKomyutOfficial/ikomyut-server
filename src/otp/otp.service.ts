// otp.service.ts

import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { subHours } from 'date-fns';
import { Otp } from './schemas/otp.schema';
import { Drivers } from '../drivers/schemas/drivers.schema';

@Injectable()
export class OtpService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
  ) {}

  /**
   * Generate OTP, store it, and send SMS.
   */
  async sendOtp(mobileNumber: string): Promise<void> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();

    let otpRecord = await this.otpModel.findOne({ mobileNumber }).exec();
    const dayAgo = subHours(now, 24).getTime();

    if (otpRecord) {
      const messagesToday = otpRecord.messages.filter(
        (m) => new Date(m.sent).getTime() > dayAgo,
      ).length;

      if (messagesToday >= 5) {
        throw new HttpException(
          'You have reached your OTP limit today',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      const lastSent = otpRecord.messages[otpRecord.messages.length - 1]?.sent;
      if (lastSent && now.getTime() - new Date(lastSent).getTime() < 60_000) {
        throw new HttpException(
          'Please wait before requesting another OTP',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      otpRecord.code = otpCode;
      otpRecord.createdAt = now;
    } else {
      otpRecord = new this.otpModel({
        mobileNumber,
        code: otpCode,
        messages: [],
        createdAt: now,
        failedAttempts: 0,
      });
    }

    const msg = `Your 6-digit code is ${otpCode}. Don't share this code with anyone.`;

    const isProd = this.configService.get('NODE_ENV') === 'production';
    if (isProd) {
      try {
        const res = await axios.post(
          'https://api.promotexter.com/sms/send',
          {
            apiKey: this.configService.get('SMS_API_KEY'),
            apiSecret: this.configService.get('SMS_API_SECRET'),
            from: this.configService.get('SMS_SENDER_MASK'),
            to: `0${mobileNumber.slice(-10)}`,
            text: msg,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );

        if (res.data?.status !== 'ok') {
          throw new Error(JSON.stringify(res.data));
        }

        console.log('SMS sent successfully:', res.data);
      } catch (err: any) {
        console.error('SMS send error:', err.response?.data || err.message);
        throw new HttpException(
          `Failed to send OTP SMS: ${err.response?.data?.message || err.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      console.log(`[DEV MODE] OTP for ${mobileNumber}: ${otpCode}`);
    }

    otpRecord.messages.push({ msg, sent: now });
    await otpRecord.save();
  }

  /**
   * Validate OTP and return whether user is new or existing.
   */
  async validateOtp(
    mobileNumber: string,
    code: string,
  ): Promise<{ isNewUser: boolean }> {
    const otpRecord = await this.otpModel.findOne({ mobileNumber }).exec();

    if (!otpRecord) {
      throw new HttpException(
        'No OTP found for this number',
        HttpStatus.NOT_FOUND,
      );
    }

    // Expiration check (5 minutes)
    const now = new Date();
    const expiryTime = new Date(otpRecord.createdAt);
    expiryTime.setMinutes(expiryTime.getMinutes() + 5);

    if (now > expiryTime) {
      await this.otpModel.deleteOne({ _id: otpRecord._id });
      throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
    }

    // Failed attempts
    otpRecord.failedAttempts = otpRecord.failedAttempts ?? 0;
    const MAX_ATTEMPTS = 5;

    if (otpRecord.failedAttempts >= MAX_ATTEMPTS) {
      await this.otpModel.deleteOne({ _id: otpRecord._id });
      throw new HttpException(
        'Maximum OTP attempts exceeded. Please request a new OTP.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (otpRecord.code !== code) {
      otpRecord.failedAttempts += 1;
      await otpRecord.save();
      throw new HttpException('Invalid OTP!', HttpStatus.BAD_REQUEST);
    }

    await this.otpModel.deleteOne({ _id: otpRecord._id });
    const driver = await Promise.all([
      this.driverModel.findOne({ mobileNumber }).exec(),
    ]);

    const existingUser = driver;

    return { isNewUser: !existingUser };
  }

  /**
   * Send custom SMS message
   */
  async sendCustomSms(mobileNumber: string, text: string): Promise<void> {
    if (!text || text.trim().length === 0) {
      throw new HttpException(
        'Message cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isProd = this.configService.get('NODE_ENV') === 'production';

    if (isProd) {
      try {
        const res = await axios.post(
          'https://api.promotexter.com/sms/send',
          {
            apiKey: this.configService.get('SMS_API_KEY'),
            apiSecret: this.configService.get('SMS_API_SECRET'),
            from: this.configService.get('SMS_SENDER_MASK'),
            to: `0${mobileNumber.slice(-10)}`,
            text,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );

        if (res.data?.status !== 'ok') {
          throw new Error(JSON.stringify(res.data));
        }

        console.log('Custom SMS sent:', res.data);
      } catch (err: any) {
        console.error('Custom SMS error:', err.response?.data || err.message);
        throw new HttpException(
          `Failed to send SMS: ${err.response?.data?.message || err.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      console.log(`[DEV MODE] SMS to ${mobileNumber}: ${text}`);
    }
  }
}
