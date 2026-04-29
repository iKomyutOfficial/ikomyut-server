import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route, RouteDocument } from './schemas/route.schema';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(Route.name)
    private routeModel: Model<RouteDocument>,
  ) {}

  async create(dto: CreateRouteDto) {
    return this.routeModel.create(dto);
  }

  async findAll() {
    return this.routeModel.find().exec();
  }

  async findOne(id: string) {
    const route = await this.routeModel.findById(id);
    if (!route) throw new NotFoundException('Route not found');
    return route;
  }

  async update(id: string, dto: UpdateRouteDto) {
    const updated = await this.routeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Route not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.routeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Route not found');
    return deleted;
  }
}
