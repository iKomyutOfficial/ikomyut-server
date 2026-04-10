import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  Transactions,
  TransactionsDocuments,
} from '../schemas/transactions.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transactions.name)
    private readonly transactionModel: Model<TransactionsDocuments>,
  ) {}

  // CREATE
  async create(createDto: CreateTransactionDto): Promise<Transactions> {
    const created = new this.transactionModel({
      ...createDto,
      userId: new Types.ObjectId(createDto.userId),
    });

    return created.save();
  }

  // READ ALL
  async findAll(): Promise<Transactions[]> {
    return this.transactionModel.find().sort({ createdAt: -1 }).exec();
  }

  // READ ALL BY USER
  async findByUserId(userId: string): Promise<Transactions[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId format');
    }

    return this.transactionModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  // READ ONE
  async findOne(id: string): Promise<Transactions> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  // UPDATE
  async update(
    id: string,
    updateDto: UpdateTransactionDto,
  ): Promise<Transactions> {
    const updated = await this.transactionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Transaction not found');
    }

    return updated;
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.transactionModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Transaction not found');
    }

    return { message: 'Transaction deleted successfully' };
  }
}
