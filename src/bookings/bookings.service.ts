import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings, BookingsDocument } from '../schemas/bookings.schema';
import { BookingsGateway } from './bookings.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectModel(Bookings.name)
    private readonly bookingModel: Model<BookingsDocument>,
    private readonly bookingsGateway: BookingsGateway,
  ) {}

  /** Create a booking and emit via WebSocket */
  async createBooking(dto: CreateBookingDto): Promise<Bookings> {
    const booking = await this.bookingModel.create(dto);
    this.logger.log(`Created new booking id=${booking._id}`);
    this.bookingsGateway.emitNewBooking(booking);

    return booking;
  }

  async updateTripStatus(id: string, status: number): Promise<Bookings> {
    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      { tripStatus: status },
      { new: true },
    );

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    
    this.bookingsGateway.emitBookingUpdate(booking);
    if (status === 1) {
      this.bookingsGateway.emitBookingActive(booking);
    }

    return booking;
  }

  /** Find all bookings with pagination */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ total: number; page: number; limit: number; data: Bookings[] }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.bookingModel.find().skip(skip).limit(limit).lean(),
      this.bookingModel.countDocuments(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  /** Find one booking by ID */
  async findOne(id: string): Promise<Bookings> {
    this.logger.log(`Fetching booking id=${id}`);
    const booking = await this.bookingModel.findById(id).exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  /** Update a booking */
  async update(id: string, dto: UpdateBookingDto): Promise<Bookings> {
    this.logger.log(`Updating booking id=${id}`);
    this.logger.debug(`Payload: ${JSON.stringify(dto)}`);

    const booking = await this.bookingModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    // Emit the updated booking
    this.bookingsGateway.emitBookingUpdate(booking);

    return booking;
  }

  /** Remove a booking */
  async remove(id: string): Promise<void> {
    this.logger.warn(`Deleting booking id=${id}`);

    const result = await this.bookingModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }
}
