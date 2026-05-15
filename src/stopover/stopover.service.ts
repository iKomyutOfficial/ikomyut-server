import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StopOver } from './schemas/stopover.schema';
import { CreateStopOverDto } from './dto/create-stopover.dto';
import { UpdateStopOverDto } from './dto/update-stopover.dto';
import { RequestWithCompany } from '../types/request';

@Injectable()
export class StopOverService {
  constructor(
    @InjectModel(StopOver.name)
    private readonly stopOverModel: Model<StopOver>,
  ) {}

  async create(
    dto: CreateStopOverDto,
    user: RequestWithCompany,
  ): Promise<StopOver> {
    const admin = new this.stopOverModel({
      ...dto,
      companyId: user.companyId,
      createdBy: user.username,
    });
    return admin.save();
  }

  async findAll(user: any) {
    return this.stopOverModel.find({ companyId: user.companyId }).exec();
  }
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const stop = await this.stopOverModel.findById(id);
    if (!stop) throw new NotFoundException('StopOver not found');
    return stop;
  }

  async findByRouteId(routeId: string) {
    if (!routeId || !routeId.trim()) {
      throw new BadRequestException('routeId is required');
    }

    return this.stopOverModel.find({ routeId: routeId.trim() }).exec();
  }

  async update(id: string, dto: UpdateStopOverDto) {
    const updated = await this.stopOverModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('StopOver not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.stopOverModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('StopOver not found');
    return deleted;
  }

  async getTotalRegistered(companyId: string) {
    return this.stopOverModel.countDocuments({ companyId });
  }
}
