import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentType, PaymentTypeSchema } from './schemas/payment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentType.name, schema: PaymentTypeSchema },
    ]),
  ],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}