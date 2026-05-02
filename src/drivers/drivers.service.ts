import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Drivers, DriversDocument } from './schemas/drivers.schema';
import { RequestWithCompany } from '../types/request';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Drivers.name)
    private driverModel: Model<DriversDocument>,
  ) {}

  async create(
    dto: CreateDriverDto,
    user: RequestWithCompany,
  ): Promise<Drivers> {
    const admin = new this.driverModel({
      ...dto,
      companyId: user.companyId,
      role: 'driver',
    });

    return admin.save();
  }

  async findAll(): Promise<Drivers[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Drivers> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Drivers> {
    const updated = await this.driverModel
      .findByIdAndUpdate(id, updateDriverDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Driver not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.driverModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Driver not found');

    return { message: 'Driver deleted successfully' };
  }
}
