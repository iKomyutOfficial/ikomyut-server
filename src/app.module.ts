import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { OtpModule } from './otp/otp.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { VersionsModule } from './versions/versions.module';
import { DriversModule } from './drivers/drivers.module';
import { AdminsModule } from './admins/admins.module';
import { ConductorsModule } from './conductors/conductors.module';
import { FleetsModule } from './fleets/fleets.module';
import { TicketsModule } from './tickets/tickets.module';
import { RouteModule } from './route/route.module';
import { UnitModule } from './unit/unit.module';

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
          limit: 500,
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
    PaymentTypeModule,
    VersionsModule,
    OtpModule,
    DriversModule,
    AdminsModule,
    ConductorsModule,
    FleetsModule,
    TicketsModule,
    RouteModule,
    UnitModule,
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
