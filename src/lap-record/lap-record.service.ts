import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLapRecordDto } from './dto/create-lap-record.dto';
import { UpdateLapRecordDto } from './dto/update-lap-record.dto';
import { LapRecord, LapRecordDocument } from './schemas/lap-record.schema';

@Injectable()
export class LapRecordService {
  constructor(
    @InjectModel(LapRecord.name)
    private model: Model<LapRecordDocument>,
  ) {}

  async create(dto: CreateLapRecordDto, user: any): Promise<LapRecord> {
    const admin = new this.model({
      ...dto,
      companyId: user.companyId,
    });
    return admin.save();
  }

  async findAll() {
    return this.model.find().sort({ timestamp: -1 }).exec();
  }

  async findOne(id: string) {
    const record = await this.model.findById(id).exec();
    if (!record) throw new NotFoundException('Lap record not found');
    return record;
  }

  async update(id: string, dto: UpdateLapRecordDto) {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Lap record not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Lap record not found');

    return { message: 'Deleted successfully' };
  }

  // 🔥 Useful queries (based on your indexes)

  async findByDevice(account: string, deviceImei: string) {
    return this.model
      .find({ account, deviceImei })
      .sort({ timestamp: -1 })
      .exec();
  }

  async findByGeofence(account: string, geofenceId: string) {
    return this.model
      .find({ account, geofenceId })
      .sort({ timestamp: -1 })
      .exec();
  }
}
