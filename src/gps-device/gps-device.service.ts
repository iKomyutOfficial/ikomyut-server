import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGPSDeviceDto } from './dto/create-gps-device.dto';
import { UpdateGPSDeviceDto } from './dto/update-gps-device.dto';
import { GPSDevice, GPSDeviceDocument } from './schemas/gps-device.schema';

@Injectable()
export class GPSDeviceService {
  constructor(
    @InjectModel(GPSDevice.name)
    private gpsDeviceModel: Model<GPSDeviceDocument>,
  ) {}

  async create(dto: CreateGPSDeviceDto, user: any): Promise<GPSDevice> {
    const admin = new this.gpsDeviceModel({
      ...dto,
      companyId: user.companyId,
    });
    return admin.save();
  }

  async findAll(user: any) {
    return this.gpsDeviceModel.find({ companyId: user.companyId }).exec();
  }

  async findOne(id: string): Promise<GPSDevice> {
    const device = await this.gpsDeviceModel.findById(id).exec();
    if (!device) throw new NotFoundException('GPS Device not found');
    return device;
  }

  async update(id: string, dto: UpdateGPSDeviceDto): Promise<GPSDevice> {
    const updated = await this.gpsDeviceModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('GPS Device not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.gpsDeviceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('GPS Device not found');

    return { message: 'Deleted successfully' };
  }

  async findByImei(imei: string): Promise<GPSDevice> {
    const device = await this.gpsDeviceModel.findOne({ imei }).exec();

    if (!device) {
      throw new NotFoundException(`GPS Device with IMEI ${imei} not found`);
    }

    return device;
  }

  async getTotalRegistered(companyId: string) {
    return this.gpsDeviceModel.countDocuments({ companyId });
  }
}
