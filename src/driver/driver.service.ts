import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drivers, DriversDocument } from '../schemas/drivers.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Drivers.name) private driverModel: Model<DriversDocument>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Drivers> {
    const driver = new this.driverModel(createDriverDto);
    return driver.save();
  }

  async findAll(): Promise<Drivers[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Drivers> {
    const driver = await this.driverModel.findOne({ id }).exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Drivers> {
    const driver = await this.driverModel.findOneAndUpdate(
      { id },
      updateDriverDto,
      {
        new: true,
      },
    );
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async remove(id: string): Promise<void> {
    const result = await this.driverModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
  }

  async findByMobnum(mobnum: string): Promise<Drivers> {
    const driver = await this.driverModel.findOne({ mobnum }).exec();

    if (!driver) {
      throw new NotFoundException(
        `Driver with mobile number ${mobnum} not found`,
      );
    }

    return driver;
  }
}
