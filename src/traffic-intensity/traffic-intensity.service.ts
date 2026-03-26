import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrafficDto } from './dto/create-traffic.dto';
import { UpdateTrafficDto } from './dto/update-traffic.dto';
import { TrafficIntensity, TrafficIntensityDocument } from '../schemas/traffic-intensity.schema';

@Injectable()
export class TrafficService {
  constructor(
    @InjectModel(TrafficIntensity.name)
    private trafficModel: Model<TrafficIntensityDocument>,
  ) {}

  async create(dto: CreateTrafficDto): Promise<TrafficIntensity> {
    const exists = await this.trafficModel.findOne({ id: dto.id });
    if (exists) throw new ConflictException('ID already exists');

    return new this.trafficModel(dto).save();
  }

  async findAll(): Promise<TrafficIntensity[]> {
    return this.trafficModel.find().exec();
  }

  async findOne(id: string): Promise<TrafficIntensity> {
    const data = await this.trafficModel.findOne({ id }).exec();
    if (!data) throw new NotFoundException('Record not found');
    return data;
  }

  async update(id: string, dto: UpdateTrafficDto): Promise<TrafficIntensity> {
    const updated = await this.trafficModel
      .findOneAndUpdate({ id }, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Record not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.trafficModel.findOneAndDelete({ id }).exec();
    if (!deleted) throw new NotFoundException('Record not found');
    return { message: 'Deleted successfully' };
  }
}
