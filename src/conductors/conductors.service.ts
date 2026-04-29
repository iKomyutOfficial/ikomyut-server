import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { Conductor, ConductorDocument } from './schemas/conductor.schema';

@Injectable()
export class ConductorService {
  constructor(
    @InjectModel(Conductor.name)
    private conductorModel: Model<ConductorDocument>,
  ) {}

  async create(dto: CreateConductorDto) {
    return this.conductorModel.create(dto);
  }

  async findAll() {
    return this.conductorModel.find().exec();
  }

  async findOne(id: string) {
    const conductor = await this.conductorModel.findById(id).exec();
    if (!conductor) throw new NotFoundException('Conductor not found');
    return conductor;
  }

  async update(id: string, dto: UpdateConductorDto) {
    const updated = await this.conductorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Conductor not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.conductorModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Conductor not found');
    return deleted;
  }
}
