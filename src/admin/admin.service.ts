import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins, AdminsDocument } from '../schemas/admin.schema';
import { Bookings, BookingsDocument } from '../schemas/bookings.schema';
import { Drivers, DriversDocument } from '../schemas/drivers.schema';
import { Users, UsersDocument } from '../schemas/users.schema';
import { Messages, MessagesDocument } from '../schemas/messages.schema';
import { RegisterAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateDriverStatusDto } from './dto/update-driver.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admins.name) private adminModel: Model<AdminsDocument>,
    // @InjectModel(Bookings.name)
    // private readonly bookingsModel: Model<BookingsDocument>,
    @InjectModel(Drivers.name) private driverModel: Model<DriversDocument>,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(Messages.name) private msgModel: Model<MessagesDocument>,
  ) {}

  // Create Admin/Emplyee
  async register(dto: RegisterAdminDto) {
    // Normalize input
    const username = dto.username.trim();
    const email = dto.email.trim().toLowerCase();
    const mobile = dto.mobnum.trim();

    // Check for existing username, email, or mobile
    const existingAdmin = await this.adminModel.findOne({
      $or: [{ username }, { email }, { mobnum: mobile }],
    });

    if (existingAdmin) {
      if (existingAdmin.username === username)
        throw new BadRequestException('Username already exists');
      if (existingAdmin.email === email)
        throw new BadRequestException('Email already exists');
      if (existingAdmin.mobnum === mobile)
        throw new BadRequestException('Mobile number already exists');
    }

    // Generate employeeId with year + incremental number
    const year = new Date().getFullYear().toString();
    const lastAdmin = await this.adminModel
      .findOne({ employeeId: { $regex: `^${year}` } })
      .sort({ employeeId: -1 })
      .exec();

    let nextIdNumber = 1;
    if (lastAdmin) {
      nextIdNumber = parseInt(lastAdmin.employeeId.slice(4)) + 1;
    }
    const employeeId = `${year}${nextIdNumber.toString().padStart(6, '0')}`;

    // Create new admin
    const admin = new this.adminModel({
      ...dto,
      employeeId,
      username,
      email,
      mobnum: mobile,
      password: await bcrypt.hash(dto.password, 10),
      type: 'admin',
    });

    await admin.save();

    // Remove sensitive fields
    const { password, __v, ...adminData } = admin.toObject();

    return { message: 'Admin registered successfully', admin: adminData };
  }

  // Login Auth Admin/Employee
  async login(dto: LoginAdminDto) {
    const admin = await this.adminModel.findOne({
      username: dto.username,
      type: 'admin',
    });
    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    admin.isLogged = true;
    await admin.save();
    const { password, __v, ...adminData } = admin.toObject();
    const apiKeys =
      process.env.ADMIN_API_KEYS?.split(',').map((k) => k.trim()) || [];
    const apiKey = apiKeys.length
      ? apiKeys[Math.floor(Math.random() * apiKeys.length)]
      : null;
    return { message: 'Login successful', apiKey, admin: adminData };
  }

  async getAllEmployees() {
    const employees = await this.adminModel.find().select('-password -__v');
    return { employees };
  }

  async findAdminByMobnum(mobnum: string) {
    const admin = await this.adminModel
      .findOne({ mobnum })
      .select('-password -__v')
      .lean()
      .exec();

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  // Find Admin by ID
  async findAdminById(id: string) {
    const user = await this.adminModel.findOne({ _id: id, type: 'admin' });
    if (!user) return null;
    const { password, __v, ...userData } = user.toObject();
    return userData;
  }

  // Update admin information
  async updateAdmin(
    adminId: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admins> {
    // Check if username is being updated
    if (updateAdminDto.username) {
      const existingAdmin = await this.adminModel.findOne({
        username: updateAdminDto.username,
      });

      // If a different admin already has this username, throw an error
      if (existingAdmin && existingAdmin._id.toString() !== adminId) {
        throw new BadRequestException('Username already exists');
      }
    }

    // Update the admin
    const admin = await this.adminModel.findByIdAndUpdate(
      adminId,
      { $set: updateAdminDto },
      { new: true },
    );

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  // Change password
  async changePassword(
    adminId: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const admin = await this.adminModel.findById(adminId);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, admin.password);

    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    admin.password = await bcrypt.hash(dto.newPassword, 10);
    await admin.save();

    return { message: 'Password changed successfully' };
  }

  // Fetching all Bookings
  // async getAllBookings(): Promise<Bookings[]> {
  //   const docs = await this.bookingsModel.find().exec();
  //   return docs;
  // }

  // async getLimitedBookings(page = 1, limit = 10000) {
  //   return this.bookingsModel
  //     .find()
  //     .skip((page - 1) * limit)
  //     .limit(limit)
  //     .sort({ createdAt: -1 })
  //     .lean()
  //     .exec();
  // }

  // Fetching all Drivers
  async getAllDrivers(): Promise<Drivers[]> {
    return this.driverModel.find().exec();
  }

  // Fetching Driver by Id
  async getDriverById(id: string): Promise<Drivers> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }
  // Update Driver Status
  async updateDriverStatus(
    id: string,
    statusDto: UpdateDriverStatusDto,
  ): Promise<Drivers> {
    const updateData: Partial<Drivers> = {
      status: statusDto.status,
      isLogged: false,
      fcmToken: '',
    };

    // Include updatedBy if provided
    if (statusDto.updatedBy) {
      updateData.updatedBy = statusDto.updatedBy;
    }

    const updatedDriver = await this.driverModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();

    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return updatedDriver;
  }

  // Fetch Driver History
  // async getDriverHistory(driverId: string): Promise<{
  //   history: Bookings[];
  //   messages: Messages[];
  // }> {
  //   const [history, messages] = await Promise.all([
  //     this.bookingsModel.find({ driverId }).exec(),
  //     this.msgModel.find({ driverId }).exec(),
  //   ]);

  //   if (!history?.length && !messages?.length) {
  //     throw new NotFoundException(
  //       `No history or messages found for Driver with ID ${driverId}.`,
  //     );
  //   }

  //   return {
  //     history,
  //     messages,
  //   };
  // }

  // Fetch all Riders
  async getAllRiders(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  // Fetch Rider by ID
  async getRiderById(id: string): Promise<Users> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return user;
  }

  // Fetch Rider History
  // async getRiderHistory(riderId: string): Promise<Bookings> {
  //   const rider = await this.bookingsModel.findById(riderId).exec();
  //   if (!rider) {
  //     throw new NotFoundException(`Driver with ID ${riderId} not found`);
  //   }
  //   return rider;
  // }
}
