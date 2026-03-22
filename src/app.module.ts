import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeakHourModule } from './peak-hour/peak-hour.module';
import { AdminModule } from './admin/admin.module';
import { DriversModule } from './driver/driver.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { RainyDaySurchargeModule } from './rainy-day-surcharge/rainy-day-surcharge.module';
import { TimeMatrixModule } from './time-matrix/time-matrix.module';
import { TnvsConfigurationModule } from './tnvs-configuration/tnvs-configuration.module';
import { TrafficIntensityModule } from './traffic-intensity/traffic-intensity.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { VersionsModule } from './versions/versions.module';
import { OtpModule } from './otp/otp.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    FilesModule,
    UsersModule,
    DriversModule,
    AdminModule,
    TimeMatrixModule,
    RainyDaySurchargeModule,
    PaymentTypeModule,
    TnvsConfigurationModule,
    TrafficIntensityModule,
    PeakHourModule,
    VersionsModule,
    OtpModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
