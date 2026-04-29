import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drivers } from '../drivers/schemas/drivers.schema';
import { Admins } from '../admins/schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGateway } from './auth.gateway';
import { Conductor } from '../conductors/schemas/conductor.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    @InjectModel(Conductor.name) private conductorModel: Model<Conductor>,
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
    const account: any = driver;

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
    this.authGateway.emitNewLogins(admin);

    return {
      access_token: token,
      admin,
    };
  }

  async login(username: string, password: string) {
    let account: any =
      (await this.adminModel.findOne({ username })) ||
      (await this.driverModel.findOne({ username })) ||
      (await this.conductorModel.findOne({ username }));

    const role =
      account?.role ||
      ((await this.adminModel.findOne({ username }))
        ? 'admin'
        : (await this.driverModel.findOne({ username }))
          ? 'driver'
          : account
            ? 'conductor'
            : null);

    if (!account) throw new UnauthorizedException('Invalid credentials');

    if (!(await bcrypt.compare(password, account.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: account._id,
      username,
      role,
    });

    await this[`${role}Model`]?.findByIdAndUpdate(account._id, {
      authToken: token,
    });

    if (role === 'admin') this.authGateway.emitNewLogins(account);

    const user = account.toObject();
    delete user.password;

    return { access_token: token, user, role };
  }
}
