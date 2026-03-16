import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { Users, UsersSchema } from '../schemas/users.schema';
import { Admins, AdminsSchema } from '../schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Users.name, schema: UsersSchema },
    ]),

    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
