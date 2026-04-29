import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketModel: Model<TicketDocument>,
  ) {}

  async create(dto: CreateTicketDto) {
    return this.ticketModel.create(dto);
  }

  async findAll() {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findById(id);
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async update(id: string, dto: UpdateTicketDto) {
    const updated = await this.ticketModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Ticket not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.ticketModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Ticket not found');
    return deleted;
  }
}
