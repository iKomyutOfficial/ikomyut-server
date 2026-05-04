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
import {
  Conductor,
  ConductorSchema,
} from '../conductors/schemas/conductor.schema';
import { Drivers, DriversSchema } from '../drivers/schemas/drivers.schema';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';
import { AdminsModule } from '../admins/admins.module';
import { AdminsService } from '../admins/admins.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Conductor.name, schema: ConductorSchema },
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
    AdminsModule,
  ],
  providers: [AuthService, JwtStrategy, AuthGateway, AdminsService],
  controllers: [AuthController],
})
export class AuthModule {}
