import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeMatrix, TimeMatrixDocument } from '../schemas/time-matrix.schema';
import { CreateTimeMatrixDto } from './dto/create-time-matrix.dto';
import { UpdateTimeMatrixDto } from './dto/update-time-matrix.dto';

@Injectable()
export class TimeMatrixService {
  constructor(
    @InjectModel(TimeMatrix.name) private timeMatrixModel: Model<TimeMatrixDocument>,
  ) { }

  async create(dto: CreateTimeMatrixDto): Promise<TimeMatrix> {
    const now = new Date().toISOString();
    const newEntry = new this.timeMatrixModel({
      ...dto,
      createdOn: now,
      updatedAt: now,
    });
    return newEntry.save();
  }

  async findAll(): Promise<TimeMatrix[]> {
    return this.timeMatrixModel.find().exec();
  }

  async findOne(id: string): Promise<TimeMatrix> {
    const result = await this.timeMatrixModel.findById(id).exec();
    if (!result) throw new NotFoundException(`Entry ${id} not found`);
    return result;
  }

  async update(id: string, dto: UpdateTimeMatrixDto): Promise<TimeMatrix> {
    const updatedAt = new Date().toISOString();
    const updated = await this.timeMatrixModel
      .findByIdAndUpdate(id, { ...dto, updatedAt }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Entry ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.timeMatrixModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Entry ${id} not found`);
    return { deleted: true };
  }
}