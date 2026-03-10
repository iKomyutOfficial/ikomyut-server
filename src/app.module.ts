import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './driver/driver.module';
import { AdminModule } from './admin/admin.module';
import { TimeMatrixModule } from './time-matrix/time-matrix.module';
import { RainyDaySurcharge } from './schemas/rainy-day-surcharge.schema';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { TnvsConfiguration } from './schemas/tnvs-configuration.schema';
import { TrafficIntensity } from './schemas/traffic-intensity.schema';
import { RainyDaySurchargeModule } from './rainy-day-surcharge/rainy-day-surcharge.module';
import { TrafficIntensityModule } from './traffic-intensity/traffic-intensity.module';
import { TnvsConfigurationModule } from './tnvs-configuration/tnvs-configuration.module';

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
    UsersModule,
    DriversModule,
    AdminModule,
    TimeMatrixModule,
    RainyDaySurchargeModule,
    PaymentTypeModule,
    TnvsConfigurationModule,
    TrafficIntensityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
