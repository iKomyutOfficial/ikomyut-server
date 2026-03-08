// otp.service.ts

import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { subHours } from 'date-fns';
// import { AdminService } from 'src/admin/admin.service';
import { Otp } from '../schemas/otp.schema';
import { UsersService } from '../users/users.service';
import { DriversService } from '../driver/driver.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private configService: ConfigService,
    private usersService: UsersService,
    private driverService: DriversService,
    // private adminService: AdminService,
  ) {}

  async generateAndStoreOtp(mobnum: string): Promise<string> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();

    // Check if OTP record exists
    let otpRecord = await this.otpModel.findOne({ mobnum }).exec();
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
        mobnum,
        code: otpCode,
        messages: [],
        createdAt: now,
        failedAttempts: 0,
      });
    }

    const msg = `Your 6-digit code is ${otpCode}. Don't share this code with anyone.`;

    // --- Environment-aware SMS sending ---
    const isProd = this.configService.get('NODE_ENV') === 'production';

    if (isProd) {
      try {
        const res = await axios.post(
          'https://api.promotexter.com/sms/send',
          {
            apiKey: this.configService.get('SMS_API_KEY'),
            apiSecret: this.configService.get('SMS_API_SECRET'),
            from: this.configService.get('SMS_SENDER_MASK'),
            to: `0${mobnum.slice(-10)}`,
            text: msg,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );

        // Only throw error if status !== "ok"
        if (res.data?.status !== 'ok') {
          throw new Error(JSON.stringify(res.data));
        }

        console.log('SMS sent successfully:', res.data);
      } catch (err: any) {
        console.error('SMS send error:', err.response?.data || err.message);
        throw new HttpException(
          `Failed to send OTP SMS: ${
            err.response?.data?.message || err.message
          }`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      console.log(`[DEV MODE] OTP for ${mobnum}: ${otpCode}`);
    }

    otpRecord.messages.push({ msg, sent: now });
    await otpRecord.save();

    return otpCode;
  }

  async sendOtpForSignup(mobnum: string): Promise<void> {
    const [foundUser] = await Promise.all([
      // this.usersService.findUser({ mobnum }),
      this.driverService.findByMobnum(mobnum),
    ]);

    if (foundUser) {
      throw new HttpException(
        `Mobile number ${mobnum} is already registered.`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const otpCode = await this.generateAndStoreOtp(mobnum);
    console.log(`OTP sent to ${mobnum}: ${otpCode}`);
  }

  async sendOtpForReset(mobnum: string): Promise<void> {
    // Must exist
    const [foundUser] = await Promise.all([
      // this.usersService.findUser({ mobnum }),
      this.driverService.findByMobnum(mobnum),
    ]);

    if (!foundUser) {
      throw new HttpException(
        `Mobile number ${mobnum} is not registered.`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    // Generate and send OTP
    const otpCode = await this.generateAndStoreOtp(mobnum);
    console.log(`OTP sent to ${mobnum}: ${otpCode}`);
  }

  // async sendOtpForResetAdmin(mobnum: string): Promise<void> {
  //   const foundAdmin = await this.adminService.findAdminByMobnum(mobnum);

  //   if (!foundAdmin) {
  //     throw new HttpException(
  //       `Admin mobile number ${mobnum} is not registered.`,
  //       HttpStatus.PRECONDITION_FAILED,
  //     );
  //   }

  //   // Optional: block disabled admins
  //   if (foundAdmin.disabled) {
  //     throw new HttpException(
  //       'Admin account is disabled',
  //       HttpStatus.FORBIDDEN,
  //     );
  //   }

  //   const otpCode = await this.generateAndStoreOtp(mobnum);
  //   console.log(`OTP sent to admin ${mobnum}: ${otpCode}`);
  // }

  async validateOtp(mobnum: string, code: string): Promise<void> {
    const otpRecord = await this.otpModel.findOne({ mobnum }).exec();

    if (!otpRecord) {
      throw new HttpException(
        'No OTP found for this number',
        HttpStatus.NOT_FOUND,
      );
    }

    // Check expiration (5 minutes)
    const now = new Date();
    const expiryTime = new Date(otpRecord.createdAt);
    expiryTime.setMinutes(expiryTime.getMinutes() + 5);

    if (now > expiryTime) {
      // Optional: delete expired OTP
      await this.otpModel.deleteOne({ _id: otpRecord._id });
      throw new HttpException('OTP has expired', HttpStatus.BAD_REQUEST);
    }

    // Track failed attempts
    otpRecord.failedAttempts = otpRecord.failedAttempts ?? 0;
    const MAX_ATTEMPTS = 5;

    if (otpRecord.failedAttempts >= MAX_ATTEMPTS) {
      await this.otpModel.deleteOne({ _id: otpRecord._id });
      throw new HttpException(
        `Maximum OTP attempts exceeded. Please request a new OTP.`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Validate code
    if (otpRecord.code !== code) {
      otpRecord.failedAttempts += 1;
      await otpRecord.save();
      throw new HttpException('Invalid OTP!', HttpStatus.BAD_REQUEST);
    }

    // OTP is valid → delete record
    await this.otpModel.deleteOne({ _id: otpRecord._id });
  }
}
