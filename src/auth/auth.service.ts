import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drivers } from '../schemas/drivers.schema';
import { Users } from '../schemas/users.schema';
import { Admins } from '../schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    private jwtService: JwtService,
    private otpService: OtpService,
    private authGateway: AuthGateway,
  ) {}

  // DRIVER / USER OTP
  async requestOtp(mobnum: string) {
    await this.otpService.sendOtp(mobnum);
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(mobnum: string, otp: string) {
    const { isNewUser } = await this.otpService.validateOtp(mobnum, otp);

    if (isNewUser) {
      return { requiresRegistration: true, mobnum };
    }

    const driver = await this.driverModel.findOne({ mobnum });
    const user = await this.userModel.findOne({ mobnum });
    const account: any = driver || user;

    if (!account) throw new UnauthorizedException('Account not found');

    const payload = {
      sub: account._id,
      mobnum: account.mobnum,
      email: account.email || null,
      type: driver ? 'driver' : 'user',
    };

    const token = this.jwtService.sign(payload);
    account.authToken = token;
    await account.save();

    return {
      access_token: token,
      user: account,
    };
  }

  // ADMIN LOGIN
  async loginAdmin(username: string, password: string) {
    const admin: any = await this.adminModel.findOne({ username });
    if (!admin) throw new UnauthorizedException('Admin not found');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const payload = {
      sub: admin._id,
      username: admin.username,
      type: 'admin',
    };

    const token = this.jwtService.sign(payload);

    admin.authToken = token;
    await admin.save();

    // 🔥 Emit via WebSocket
    this.authGateway.emitNewLogins(admin);

    return {
      access_token: token,
      admin,
    };
  }
}
