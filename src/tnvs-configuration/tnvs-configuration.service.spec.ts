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

  async findOne(objectId: string): Promise<TnvsConfiguration> {
    const tnvsConfiguration = await this.tnvsConfigurationModel
      .findById(objectId)
      .exec();

    if (!tnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with objectId "${objectId}" not found`,
      );
    }

    return tnvsConfiguration;
  }

  async update(
    objectId: string,
    updateTnvsConfigurationDto: UpdateTnvsConfigurationDto,
  ): Promise<TnvsConfiguration> {
    const updatedTnvsConfiguration = await this.tnvsConfigurationModel
      .findByIdAndUpdate(objectId, updateTnvsConfigurationDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedTnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with objectId "${objectId}" not found`,
      );
    }

    return updatedTnvsConfiguration;
  }

  async remove(objectId: string): Promise<{ message: string }> {
    const deletedTnvsConfiguration = await this.tnvsConfigurationModel
      .findByIdAndDelete(objectId)
      .exec();

    if (!deletedTnvsConfiguration) {
      throw new NotFoundException(
        `TnvsConfiguration with objectId "${objectId}" not found`,
      );
    }

    return { message: 'TnvsConfiguration deleted successfully' };
  }
}