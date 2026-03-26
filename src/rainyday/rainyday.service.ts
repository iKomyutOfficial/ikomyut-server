import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRainyDayDto } from './dto/create-rainyday.dto';
import { UpdateRainyDayDto } from './dto/update-rainyday.dto';
import { RainyDaySurcharge, RainyDaySurchargeDocument } from '../schemas/rainy-day-surcharge.schema';

@Injectable()
export class RainyDayService {
  constructor(
    @InjectModel(RainyDaySurcharge.name)
    private rainyModel: Model<RainyDaySurchargeDocument>,
  ) {}

  async create(dto: CreateRainyDayDto): Promise<RainyDaySurcharge> {
    const exists = await this.rainyModel.findOne({ id: dto.id });
    if (exists) throw new ConflictException('ID already exists');

    const created = new this.rainyModel(dto);
    return created.save();
  }

  async findAll(): Promise<RainyDaySurcharge[]> {
    return this.rainyModel.find().exec();
  }

  async findOne(id: string): Promise<RainyDaySurcharge> {
    const data = await this.rainyModel.findOne({ id }).exec();
    if (!data) throw new NotFoundException('Record not found');
    return data;
  }

  async update(id: string, dto: UpdateRainyDayDto): Promise<RainyDaySurcharge> {
    const updated = await this.rainyModel
      .findOneAndUpdate({ id }, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Record not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.rainyModel.findOneAndDelete({ id }).exec();
    if (!deleted) throw new NotFoundException('Record not found');
    return { message: 'Deleted successfully' };
  }
}
