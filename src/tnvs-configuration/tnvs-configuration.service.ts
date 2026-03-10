import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly tnvsConfigurationModel: Model<TnvsConfigurationDocument>,
  ) {}

  async create(
    createTnvsConfigurationDto: CreateTnvsConfigurationDto,
  ): Promise<TnvsConfiguration> {
    const createdTnvsConfiguration = new this.tnvsConfigurationModel(
      createTnvsConfigurationDto,
    );
    return createdTnvsConfiguration.save();
  }

  async findAll(): Promise<TnvsConfiguration[]> {
    return this.tnvsConfigurationModel.find().exec();
  }

  async findOne(id: string): Promise<TnvsConfiguration> {
    const tnvsConfiguration = await this.tnvsConfigurationModel
      .findOne({ id })
      .exec();

    if (!tnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with id "${id}" not found`,
      );
    }

    return tnvsConfiguration;
  }

  async update(
    id: string,
    updateTnvsConfigurationDto: UpdateTnvsConfigurationDto,
  ): Promise<TnvsConfiguration> {
    const updatedTnvsConfiguration = await this.tnvsConfigurationModel
      .findOneAndUpdate({ id }, updateTnvsConfigurationDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedTnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with id "${id}" not found`,
      );
    }

    return updatedTnvsConfiguration;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedTnvsConfiguration = await this.tnvsConfigurationModel
      .findOneAndDelete({ id })
      .exec();

    if (!deletedTnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with id "${id}" not found`,
      );
    }

    return { message: 'TnvsConfiguration deleted successfully' };
  }
}