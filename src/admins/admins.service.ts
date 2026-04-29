import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admins, AdminsDocument } from './schemas/admin.schema';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admins.name)
    private adminModel: Model<AdminsDocument>,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admins> {
    const admin = new this.adminModel(dto);
    return admin.save();
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
