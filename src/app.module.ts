import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
<<<<<<< HEAD

=======
>>>>>>> 022d1887fc30706c422f2f5d913336b98efc4745

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}