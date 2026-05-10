import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drivers } from '../drivers/schemas/drivers.schema';
import { Admins } from '../admins/schemas/admin.schema';
import { OtpService } from '../otp/otp.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGateway } from './auth.gateway';
import { Conductor } from '../conductors/schemas/conductor.schema';
import { LoginDto } from './dto/login.dto';
import { Employee } from '../employee/schemas/employee.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Conductor.name) private conductorModel: Model<Conductor>,
    private jwtService: JwtService,
    private otpService: OtpService,
    private authGateway: AuthGateway,
  ) {}

  // DRIVER / USER OTP
  async requestOtp(mobileNumber: string) {
    await this.otpService.sendOtp(mobileNumber);

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(mobileNumber: string, otp: string) {
    const { isNewUser } = await this.otpService.validateOtp(mobileNumber, otp);

    if (isNewUser) {
      return { requiresRegistration: true, mobileNumber };
    }

    const driver = await this.driverModel.findOne({ mobileNumber });
    const account: any = driver;

    if (!account) {
      throw new UnauthorizedException('Account not found');
    }

    const payload = {
      sub: account._id,
      mobileNumber: account.mobileNumber,
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
    const { username, mobileNumber, password } = loginDto;

    if (!username && !mobileNumber) {
      throw new BadRequestException(
        'Either username or mobile number is required',
      );
    }

    const identifier = username || mobileNumber;

    const admin = await this.adminModel
      .findOne({
        $or: [{ username: identifier }, { mobileNumber: identifier }],
      })
      .select('+password');

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.isRegistered) {
      await this.otpService.sendOtp(admin.mobileNumber);

      throw new UnauthorizedException({
        message:
          'Account not verified. OTP has been sent to your mobile number.',
        mobileNumber: admin.mobileNumber,
      });
    }

    if (!password || !admin.password) {
      throw new UnauthorizedException('Username or password missing');
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

    const adminData = admin.toObject();
    this.authGateway.emitNewLogins(adminData);

    return {
      access_token: token,
      admin: adminData,
    };
  }

  // EMPLOYEE / DRIVER / CONDUCTOR LOGIN
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    let account: any =
      (await this.employeeModel.findOne({ username })) ||
      (await this.driverModel.findOne({ username })) ||
      (await this.conductorModel.findOne({ username }));

    const role =
      account?.role ||
      ((await this.employeeModel.findOne({ username }))
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

  // =========================
  // FORGOT PASSWORD
  // =========================

  // STEP 1: SEND OTP
  async forgotPasswordRequest(identifier: string) {
    const query = identifier?.trim();

    if (!query) {
      throw new BadRequestException('Username or mobile number is required');
    }

    const isMobile = /^\d+$/.test(query);

    const searchFilter = isMobile
      ? { mobileNumber: query }
      : { username: query };

    const account =
      (await this.employeeModel.findOne(searchFilter)) ||
      (await this.driverModel.findOne(searchFilter)) ||
      (await this.conductorModel.findOne(searchFilter)) ||
      (await this.adminModel.findOne(searchFilter));

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    if (!account.mobileNumber) {
      throw new BadRequestException('No mobile number linked to account');
    }

    await this.otpService.sendOtp(account.mobileNumber);

    return {
      message: 'OTP sent successfully',
      mobileNumber: account.mobileNumber,
    };
  }

  // STEP 2: VERIFY OTP + RESET PASSWORD
  async resetPassword(identifier: string, otp: string, newPassword: string) {
    const query = identifier?.trim();

    if (!query) {
      throw new BadRequestException('Username or mobile number is required');
    }

    const isMobile = /^\d+$/.test(query);

    const searchFilter = isMobile
      ? { mobileNumber: query }
      : { username: query };

    const account: any =
      (await this.employeeModel.findOne(searchFilter).select('+password')) ||
      (await this.driverModel.findOne(searchFilter).select('+password')) ||
      (await this.conductorModel.findOne(searchFilter).select('+password')) ||
      (await this.adminModel.findOne(searchFilter).select('+password'));

    if (!account) {
      throw new BadRequestException('Account not found');
    }

    if (!account.mobileNumber) {
      throw new BadRequestException('No mobile number linked to account');
    }

    // validate OTP
    await this.otpService.validateOtp(account.mobileNumber, otp);

    // IMPORTANT: ensure hashing (depends on your schema)
    account.password = newPassword;

    account.authToken = null;

    await account.save();

    return {
      message: 'Password reset successful',
    };
  }
}
