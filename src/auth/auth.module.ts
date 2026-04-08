import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Drivers, DriversSchema } from '../schemas/drivers.schema';
import { Users, UsersSchema } from '../schemas/users.schema';
import { Admins, AdminsSchema } from '../schemas/admin.schema';
import { OtpModule } from '../otp/otp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGateway } from './auth.gateway';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Users.name, schema: UsersSchema },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET is not defined!');
        }

        return {
          secret,
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),

    OtpModule,
  ],
  providers: [AuthService, JwtStrategy, AuthGateway],
  controllers: [AuthController],
})
export class AuthModule {}
