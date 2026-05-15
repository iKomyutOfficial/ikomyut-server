import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConductorDto } from './dto/create-conductor.dto';
import { UpdateConductorDto } from './dto/update-conductor.dto';
import { Conductor, ConductorDocument } from './schemas/conductor.schema';
import { RequestWithCompany } from '../types/request';
import { excludeFields } from '../common/utils/excludeFields';
import { validateUniqueFields } from '../common/utils/validateUniqueFields';

@Injectable()
export class ConductorService {
  constructor(
    @InjectModel(Conductor.name)
    private conductorModel: Model<ConductorDocument>,
  ) {}

  private excludeSensitive(driver: ConductorDocument) {
    const obj = driver.toObject();
    return excludeFields(obj, ['password', 'authToken']);
  }

  async create(
    dto: CreateConductorDto,
    user: RequestWithCompany,
  ): Promise<Conductor> {
    await validateUniqueFields(this.conductorModel, dto, user.companyId);

    const conductor = new this.conductorModel({
      ...dto,
      companyId: user.companyId,
      createdBy: user.username,
      role: 'conductor',
    });

    return conductor.save();
  }

  async findAll(user: any) {
    const data = await this.conductorModel
      .find({ companyId: user.companyId })
      .exec();

    return data.map((e) => this.excludeSensitive(e));
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

  async getTotalRegistered(companyId: string) {
    return this.conductorModel.countDocuments({ companyId });
  }
}
