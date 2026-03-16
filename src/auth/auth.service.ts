import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomInt } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drivers } from '../schemas/drivers.schema';
import { Users } from '../schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Admins } from '../schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    private jwtService: JwtService,
  ) {}

  // DRIVER / USER OTP
  async requestOtp(mobnum: string) {
    const otp = randomInt(100000, 999999).toString();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

    const driver = await this.driverModel.findOne({ mobnum });
    const user = await this.userModel.findOne({ mobnum });

    let type: 'driver' | 'user' | 'new' = 'new';

    if (driver) {
      driver.otp = otp;
      driver.otpExpiry = otpExpiry;
      await driver.save();
      type = 'driver';
    }

    if (user) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      type = 'user';
    }

    console.log('OTP:', otp);

    return {
      message: 'OTP sent successfully',
      isRegistered: !!driver || !!user,
      type,
    };
  }

  async verifyOtp(mobnum: string, otp: string) {
    const driver = await this.driverModel.findOne({ mobnum });
    const user = await this.userModel.findOne({ mobnum });

    const account = driver || user;

    if (!account) {
      return {
        requiresRegistration: true,
        mobnum,
      };
    }

    if (account.otp !== otp) throw new UnauthorizedException('Invalid OTP');
    if (!account.otpExpiry || account.otpExpiry < new Date())
      throw new UnauthorizedException('OTP expired');

    account.isVerified = true;
    account.otp = undefined;
    await account.save();

    const payload = {
      sub: account._id,
      mobnum: account.mobnum,
      type: driver ? 'driver' : 'user',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: account,
    };
  }

  // ADMIN LOGIN
  async loginAdmin(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username });
    if (!admin) throw new UnauthorizedException('Admin not found');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = {
      sub: admin._id,
      username: admin.username,
      type: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin,
    };
  }

  // REGISTER ADMIN
  async registerAdmin(data: any) {
    const existing = await this.adminModel.findOne({ username: data.username });
    if (existing) throw new UnauthorizedException('Username already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await this.adminModel.create({
      ...data,
      password: hashedPassword,
    });

    const payload = {
      sub: admin._id,
      username: admin.username,
      type: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin,
    };
  }
}
