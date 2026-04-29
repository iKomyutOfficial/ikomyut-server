import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { Admins } from '../admins/schemas/admin.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'auth',
})
@Injectable()
export class AuthGateway {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(AuthGateway.name);

  /** Emit new logins */
  emitNewLogins(admin: Admins) {
    this.logger.log(`Emitting new login with token=${admin.authToken}`);
    this.server.emit('newToken', admin);
  }
}
