import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLapCounterSettingsDto } from './dto/create-lap-counter-settings.dto';
import { UpdateLapCounterSettingsDto } from './dto/update-lap-counter-settings.dto';
import {
  LapCounterSettings,
  LapCounterSettingsDocument,
} from './schemas/lap-counter-settings.schema';

@Injectable()
export class LapCounterSettingsService {
  constructor(
    @InjectModel(LapCounterSettings.name)
    private model: Model<LapCounterSettingsDocument>,
  ) {}

  async create(
    dto: CreateLapCounterSettingsDto,
    user: any,
  ): Promise<LapCounterSettings> {
    const admin = new this.model({
      ...dto,
      companyId: user.companyId,
    });
    return admin.save();
  }

  async findAll() {
    return this.model.find().exec();
  }

  async findOne(id: string) {
    const data = await this.model.findById(id).exec();
    if (!data) throw new NotFoundException('Settings not found');
    return data;
  }

  async findByAccount(account: string) {
    const data = await this.model.findOne({ account }).exec();
    if (!data) throw new NotFoundException('Settings not found');
    return data;
  }

  async update(id: string, dto: UpdateLapCounterSettingsDto) {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Settings not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Settings not found');

    return { message: 'Deleted successfully' };
  }
}
