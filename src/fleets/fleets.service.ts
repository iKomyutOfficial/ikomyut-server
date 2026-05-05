import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { Fleet, FleetDocument } from './schemas/fleet.schema';
import { RequestWithCompany } from '../types/request';

@Injectable()
export class FleetService {
  constructor(
    @InjectModel(Fleet.name)
    private fleetModel: Model<FleetDocument>,
  ) {}

  async create(dto: CreateFleetDto, req: RequestWithCompany): Promise<Fleet> {
    const admin = new this.fleetModel({
      ...dto,
      companyId: req.companyId,
    });
    return admin.save();
  }

  async findAll() {
    return this.fleetModel.find().exec();
  }

  async findOne(id: string) {
    const fleet = await this.fleetModel.findById(id).exec();
    if (!fleet) throw new NotFoundException('Fleet not found');
    return fleet;
  }

  async update(id: string, dto: UpdateFleetDto) {
    const updated = await this.fleetModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Fleet not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.fleetModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Fleet not found');
    return deleted;
  }

  async getTotalRegistered(companyId: string) {
    return this.fleetModel.countDocuments({ companyId });
  }
}
