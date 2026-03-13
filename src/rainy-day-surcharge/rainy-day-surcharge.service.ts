import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRainyDaySurchargeDto } from './dto/create-rainy-day-surcharge.dto';
import { UpdateRainyDaySurchargeDto } from './dto/update-rainy-day-surcharge.dto';
import {
  RainyDaySurcharge,
  RainyDaySurchargeDocument,
} from '../schemas/rainy-day-surcharge.schema';

@Injectable()
export class RainyDaySurchargeService {
  constructor(
    @InjectModel(RainyDaySurcharge.name)
    private rainyDaySurchargeModel: Model<RainyDaySurchargeDocument>,
  ) { }

  async create(createDto: CreateRainyDaySurchargeDto): Promise<RainyDaySurcharge> {
    const existing = await this.rainyDaySurchargeModel.findById(createDto.id);

    if (existing) {
      throw new ConflictException('Surcharge record with this ID already exists');
    }

    const createdRecord = new this.rainyDaySurchargeModel(createDto);
    return createdRecord.save();
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.rainyDaySurchargeModel.find().skip(skip).limit(limit).lean(),
      this.rainyDaySurchargeModel.countDocuments(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findById(id: string): Promise<RainyDaySurcharge> {
    const record = await this.rainyDaySurchargeModel.findById(id);

    if (!record) {
      throw new NotFoundException('Rainy day surcharge not found');
    }

    return record;
  }

  async update(id: string, updateDto: UpdateRainyDaySurchargeDto) {
    const record = await this.rainyDaySurchargeModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );

    if (!record) {
      throw new NotFoundException('Rainy day surcharge not found');
    }

    return record;
  }

  async remove(id: string) {
    const record = await this.rainyDaySurchargeModel.findByIdAndDelete(id);

    if (!record) {
      throw new NotFoundException('Rainy day surcharge not found');
    }

    return {
      message: 'Rainy day surcharge deleted successfully',
    };
  }
}
