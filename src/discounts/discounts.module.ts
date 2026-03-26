import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { Discounts, DiscountsSchema } from '../schemas/discount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discounts.name, schema: DiscountsSchema },
    ]),
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}
