import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TnvsConfiguration,
  TnvsConfigurationDocument,
} from '../schemas/tnvs-configuration.schema';
import { CreateTnvsConfigurationDto } from './dto/create-tnvs-configuration.dto';
import { UpdateTnvsConfigurationDto } from './dto/update-tnvs-configuration.dto';

@Injectable()
export class TnvsConfigurationService {
  constructor(
    @InjectModel(TnvsConfiguration.name)
    private readonly tnvsModel: Model<TnvsConfigurationDocument>,
  ) {}

  async create(
    createDto: CreateTnvsConfigurationDto,
  ): Promise<TnvsConfiguration> {
    try {
      return await this.tnvsModel.create(createDto);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as any).code === 11000
      ) {
        throw new ConflictException(
          `Configuration with id ${createDto.id} already exists`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<TnvsConfiguration[]> {
    return this.tnvsModel.find().exec();
  }

  async findOne(id: string): Promise<TnvsConfiguration> {
    const record = await this.tnvsModel.findById(id).exec();

    if (!record) {
      throw new NotFoundException(`Configuration with id ${id} not found`);
    }

    return record;
  }

  async update(
    id: string,
    updateDto: UpdateTnvsConfigurationDto,
  ): Promise<TnvsConfiguration> {
    const updated = await this.tnvsModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Configuration with id ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.tnvsModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`Configuration with id ${id} not found`);
    }

    return { message: 'Deleted successfully' };
  }
}
