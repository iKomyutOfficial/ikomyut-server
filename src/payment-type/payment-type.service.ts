// src/payment-type/payment-type.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentType, PaymentTypeDocument } from './schemas/payment-type.schema';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectModel(PaymentType.name)
    private paymentTypeModel: Model<PaymentTypeDocument>,
  ) {}

  private sanitize(doc: any) {
    if (!doc) return null;
    const { __v, ...rest } = doc;
    return rest;
  }

  async create(createDto: CreatePaymentTypeDto) {
    const created = new this.paymentTypeModel(createDto);
    const saved = await created.save();
    return this.sanitize(saved.toObject());
  }

  async findAll() {
    const data = await this.paymentTypeModel.find().lean();
    return data.map((d) => this.sanitize(d));
  }

  async findOne(id: string) {
    const data = await this.paymentTypeModel.findById(id).lean();
    if (!data) throw new NotFoundException('Payment type not found');
    return this.sanitize(data);
  }

  async update(id: string, updateDto: UpdatePaymentTypeDto) {
    const updated = await this.paymentTypeModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .lean();
    if (!updated) throw new NotFoundException('Payment type not found');
    return this.sanitize(updated);
  }

  async remove(id: string) {
    const deleted = await this.paymentTypeModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException('Payment type not found');
    return this.sanitize(deleted);
  }
}