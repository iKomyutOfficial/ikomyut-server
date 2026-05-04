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
import { LoginDto } from './dto/login.dto';
import { Employee } from '../employee/schemas/employee.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    @InjectModel(Employee.name) private employee: Model<Employee>,
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
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
  async loginAdmin(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const admin = await this.adminModel.findOne({ username });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: admin._id,
      username: admin.username,
      type: 'admin',
    });

    admin.authToken = token;
    await admin.save();

    this.authGateway.emitNewLogins(admin);

    return { access_token: token, admin };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    let account: any =
      (await this.employee.findOne({ username })) ||
      (await this.driverModel.findOne({ username })) ||
      (await this.conductorModel.findOne({ username }));

    const role =
      account?.role ||
      ((await this.employee.findOne({ username }))
        ? 'employee'
        : (await this.driverModel.findOne({ username }))
          ? 'driver'
          : account
            ? 'conductor'
            : null);

    if (!account) {
      return { message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return { message: 'Invalid credentials' };
    }

    const token = this.jwtService.sign({
      sub: account._id,
      username,
      role,
    });

    await this[`${role}Model`]?.findByIdAndUpdate(account._id, {
      authToken: token,
    });

    this.authGateway.emitNewLogins(account);
    const user = account.toObject();
    delete user.password;

    return {
      access_token: token,
      user,
      role,
    };
  }
}
