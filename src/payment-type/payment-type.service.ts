import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentType, PaymentTypeDocument } from '../schemas/payment-type.schema';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectModel(PaymentType.name)
    private paymentTypeModel: Model<PaymentTypeDocument>,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto): Promise<PaymentType> {
    const created = new this.paymentTypeModel(createPaymentTypeDto);
    return created.save();
  }

  async findAll(): Promise<PaymentType[]> {
    return this.paymentTypeModel.find().exec();
  }

  async findOne(id: string): Promise<PaymentType> {
    const paymentType = await this.paymentTypeModel.findById(id);
    if (!paymentType) throw new NotFoundException('Payment type not found');
    return paymentType;
  }

  async update(id: string, updateDto: UpdatePaymentTypeDto): Promise<PaymentType> {
    const updated = await this.paymentTypeModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );

    if (!updated) throw new NotFoundException('Payment type not found');

    return updated;
  }

  async remove(id: string): Promise<PaymentType> {
    const deleted = await this.paymentTypeModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Payment type not found');

    return deleted;
  }
}