import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Admins, AdminsSchema } from '../admins/schemas/admin.schema';
import { OtpModule } from '../otp/otp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGateway } from './auth.gateway';
import { AdminsModule } from '../admins/admins.module';
import { AdminsService } from '../admins/admins.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admins.name, schema: AdminsSchema }]),
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
    ConfigModule,
    OtpModule,
    AdminsModule,
  ],
  providers: [AuthService, JwtStrategy, AuthGateway, AdminsService],
  controllers: [AuthController],
})
export class AuthModule {}
