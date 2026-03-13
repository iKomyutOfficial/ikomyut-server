import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Users, UsersSchema } from '../schemas/users.schema';
import { Admins, AdminsSchema } from '../schemas/admin.schema';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
