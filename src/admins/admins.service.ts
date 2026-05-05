import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins, AdminsDocument } from './schemas/admin.schema';
import { customAlphabet, nanoid } from 'nanoid';
import { Drivers, DriversDocument } from '../drivers/schemas/drivers.schema';
import {
  Conductor,
  ConductorDocument,
} from '../conductors/schemas/conductor.schema';
import { Unit, UnitDocument } from '../unit/schemas/unit.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admins.name)
    private adminModel: Model<AdminsDocument>,

    @InjectModel(Drivers.name)
    private driverModel: Model<DriversDocument>,

    @InjectModel(Conductor.name)
    private conductorModel: Model<ConductorDocument>,

    @InjectModel(Unit.name)
    private unitModel: Model<UnitDocument>,
  ) {}

  nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
  async create(dto: CreateAdminDto): Promise<Admins> {
    const companyId = this.generateCompanyId();

    const admin = new this.adminModel({
      ...dto,
      companyId,
      role: 'admin',
      isRegistered: true,
    });

    return admin.save();
  }

  private generateCompanyId(): string {
    return `IK-${nanoid()}`;
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

  async getTotal() {
    const [data, conductor] = await Promise.all([
      this.conductorModel.find().exec(),
      this.conductorModel.countDocuments(),
    ]);

    return {
      conductor,
    };
  }
}
