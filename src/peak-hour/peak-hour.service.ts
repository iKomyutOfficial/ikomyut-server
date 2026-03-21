import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeakHour, PeakHourDocument } from '../schemas/peak-hour.schema';
import { CreatePeakHourDto } from './dto/create-peak-hour.dto';
import { UpdatePeakHourDto } from './dto/update-peak-hour.dto';

@Injectable()
export class PeakHourService {
  constructor(
    @InjectModel(PeakHour.name)
    private readonly peakHourModel: Model<PeakHourDocument>,
  ) {}

  async create(createPeakHourDto: CreatePeakHourDto): Promise<PeakHour> {
    const createdPeakHour = new this.peakHourModel(createPeakHourDto);
    return createdPeakHour.save();
  }

  async findAll(): Promise<PeakHour[]> {
    return this.peakHourModel.find().exec();
  }

  async findOne(id: string): Promise<PeakHour> {
    const peakHour = await this.peakHourModel.findById(id).exec();

    if (!peakHour) {
      throw new NotFoundException(
        `PeakHour with id "${id}" not found`,
      );
    }

    return peakHour;
  }

  async update(
    id: string,
    updatePeakHourDto: UpdatePeakHourDto,
  ): Promise<PeakHour> {
    const updatedPeakHour = await this.peakHourModel
      .findByIdAndUpdate(id, updatePeakHourDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedPeakHour) {
      throw new NotFoundException(
        `PeakHour with id "${id}" not found`,
      );
    }

    return updatedPeakHour;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedPeakHour = await this.peakHourModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPeakHour) {
      throw new NotFoundException(
        `PeakHour with id "${id}" not found`,
      );
    }

    return { message: 'PeakHour deleted successfully' };
  }
}