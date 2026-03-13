import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Versions, VersionsDocuments } from '../schemas/versions.schema';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Injectable()
export class VersionsService {
  constructor(
    @InjectModel(Versions.name)
    private readonly versionModel: Model<VersionsDocuments>,
  ) {}

  // Create
  async create(createVersionDto: CreateVersionDto): Promise<Versions> {
    const createdVersion = new this.versionModel(createVersionDto);
    return createdVersion.save();
  }

  // Find all
  async findAll(): Promise<Versions[]> {
    return this.versionModel.find().exec();
  }

  // Find one by id
  async findOne(id: string): Promise<Versions> {
    const version = await this.versionModel.findById(id).exec();
    if (!version)
      throw new NotFoundException(`Version with id ${id} not found`);
    return version;
  }

  // Update by id
  async update(
    id: string,
    updateVersionDto: UpdateVersionDto,
  ): Promise<Versions> {
    const updatedVersion = await this.versionModel.findByIdAndUpdate(
      id,
      updateVersionDto,
      { new: true }, // return updated document
    );
    if (!updatedVersion)
      throw new NotFoundException(`Version with id ${id} not found`);
    return updatedVersion;
  }

  // Delete by id
  async remove(id: string): Promise<Versions> {
    const deletedVersion = await this.versionModel.findByIdAndDelete(id);
    if (!deletedVersion)
      throw new NotFoundException(`Version with id ${id} not found`);
    return deletedVersion;
  }
}
