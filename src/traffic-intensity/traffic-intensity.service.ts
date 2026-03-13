import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  TrafficIntensity,
  TrafficIntensityDocument,
} from '../schemas/traffic-intensity.schema';

import { CreateTrafficIntensityDto } from './dto/create-traffic-intensity.dto';
import { UpdateTrafficIntensityDto } from './dto/update-traffic-intensity.dto';

@Injectable()
export class TrafficIntensityService {
  constructor(
    @InjectModel(TrafficIntensity.name)
    private readonly trafficModel: Model<TrafficIntensityDocument>,
  ) {}

  async create(dto: CreateTrafficIntensityDto) {
    const data = new this.trafficModel(dto);
    return data.save();
  }

  async findAll() {
    return this.trafficModel.find().exec();
  }

  async findById(id: string) {
    const data = await this.trafficModel.findById(id).exec();

    if (!data) {
      throw new NotFoundException('Traffic intensity not found');
    }

    return data;
  }

  async update(id: string, dto: UpdateTrafficIntensityDto) {
    const data = await this.trafficModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!data) {
      throw new NotFoundException('Traffic intensity not found');
    }

    return data;
  }

  async remove(id: string) {
    const data = await this.trafficModel.findByIdAndDelete(id).exec();

    if (!data) {
      throw new NotFoundException('Traffic intensity not found');
    }

    return { message: 'Deleted successfully' };
  }
}