import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins, AdminsDocument } from './schemas/admin.schema';
import { customAlphabet, nanoid } from 'nanoid';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admins.name)
    private adminModel: Model<AdminsDocument>,
    private otpService: OtpService,
  ) {}

  nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
  private generateCompanyId(): string {
    return `IK-${nanoid()}`;
  }

  async create(dto: CreateAdminDto): Promise<any> {
    const existingUsername = await this.adminModel.findOne({
      username: dto.username,
    });

    if (existingUsername) {
      throw new BadRequestException('Username already exists');
    }

    const existingMobile = await this.adminModel.findOne({
      mobileNumber: dto.mobileNumber,
    });

    if (existingMobile) {
      throw new BadRequestException('Mobile number already exists');
    }

    const existingEmail = await this.adminModel.findOne({ email: dto.email });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }
    const companyId = this.generateCompanyId();
    const admin = new this.adminModel({
      ...dto,
      companyId,
      role: 'admin',
      isRegistered: false,
    });

    await admin.save();
    await this.otpService.sendOtp(dto.mobileNumber);

    return {
      message: 'Registration successful. OTP sent to mobile number.',
      mobileNumber: dto.mobileNumber,
    };
  }

  async verifyRegistrationOtp(mobileNumber: string, otp: string) {
    await this.otpService.validateOtp(mobileNumber, otp);
    const admin = await this.adminModel.findOneAndUpdate(
      { mobileNumber },
      { isRegistered: true },
      { new: true },
    );

    if (!admin) {
      throw new NotFoundException('Admin account not found');
    }

    return {
      message: 'Account verified successfully',
    };
  }

  async findAll(): Promise<Admins[]> {
    return this.adminModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<Admins> {
    const admin = await this.adminModel.findById(id).select('-password').exec();

    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: string, dto: UpdateAdminDto): Promise<Admins> {
    const updated = await this.adminModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password')
      .exec();

    if (!updated) throw new NotFoundException('Admin not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.adminModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Admin not found');
    return { message: 'Admin deleted successfully' };
  }
}
