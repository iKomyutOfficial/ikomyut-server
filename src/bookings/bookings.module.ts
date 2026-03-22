import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookings, BookingsSchema } from '../schemas/bookings.schema';
import { BookingsGateway } from './bookings.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookings.name, schema: BookingsSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsGateway],
})
export class BookingsModule {}
