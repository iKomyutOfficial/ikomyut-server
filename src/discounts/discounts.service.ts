import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discounts, DiscountDocument } from '../schemas/discount.schema';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discounts.name)
    private discountModel: Model<DiscountDocument>,
  ) {}

  async create(createDto: CreateDiscountDto): Promise<Discounts> {
    const created = new this.discountModel(createDto);
    return created.save();
  }

  async findAll(): Promise<Discounts[]> {
    return this.discountModel.find().exec();
  }

  async findOne(id: string): Promise<Discounts> {
    const discount = await this.discountModel.findById(id).exec();
    if (!discount) throw new NotFoundException('Discount not found');
    return discount;
  }

  async update(id: string, updateDto: UpdateDiscountDto): Promise<Discounts> {
    const updated = await this.discountModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Discount not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.discountModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Discount not found');
    return { message: 'Deleted successfully' };
  }
}
