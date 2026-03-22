import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { Bookings } from '../schemas/bookings.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'bookings',
})
@Injectable()
export class BookingsGateway {
  @WebSocketServer()
  server!: Server; // definite assignment

  private readonly logger = new Logger(BookingsGateway.name);

  /** Emit new booking */
  emitNewBooking(booking: Bookings) {
    this.logger.log(`Emitting new booking id=${booking.referenceNumber}`);
    this.server.emit('newBooking', booking);
  }

  /** Emit booking update */
  emitBookingUpdate(booking: Bookings) {
    this.logger.log(`Emitting booking update id=${booking.referenceNumber}`);
    this.server.emit('bookingUpdate', booking);
  }

  /** Emit booking active status */
  emitBookingActive(booking: Bookings) {
    this.logger.log(`Emitting booking ACTIVE status id=${booking.referenceNumber}`);
    this.server.emit('bookingActive', {
      bookingId: booking.referenceNumber,
      tripStatus: booking.tripStatus,
      driverId: booking.driverId,
    });
  }
}
