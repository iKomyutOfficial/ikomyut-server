import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit, UnitDocument } from './schemas/unit.schema';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { RequestWithCompany } from '../types/request';

@Injectable()
export class UnitService {
  constructor(
    @InjectModel(Unit.name)
    private unitModel: Model<UnitDocument>,
  ) {}

  async create(dto: CreateUnitDto, req: RequestWithCompany): Promise<Unit> {
    const admin = new this.unitModel({
      ...dto,
      companyId: req.companyId,
    });
    return admin.save();
  }

  async findAll() {
    return this.unitModel.find().exec();
  }

  async findOne(id: string) {
    const unit = await this.unitModel.findById(id);
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async update(id: string, dto: UpdateUnitDto) {
    const updated = await this.unitModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Unit not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.unitModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Unit not found');
    return deleted;
  }
}
