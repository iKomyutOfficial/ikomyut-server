import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  create(@Body() createDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createDto);
  }

  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePaymentTypeDto,
  ) {
    return this.paymentTypeService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTypeService.remove(id);
  }
}