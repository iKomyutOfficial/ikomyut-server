import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Payment Type')
@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Payment Type' })
  @ApiBody({ type: CreatePaymentTypeDto })
  @ApiResponse({
    status: 201,
    description: 'Payment type created successfully',
  })
  create(@Body() createDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Payment Types' })
  @ApiResponse({
    status: 200,
    description: 'List of payment types retrieved successfully',
  })
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @Get(':_id')
  @ApiOperation({ summary: 'Get Payment Type by ObjectId' })
  @ApiParam({ name: '_id', type: String, description: 'Payment Type ObjectId' })
  @ApiResponse({
    status: 200,
    description: 'Payment type retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Payment type not found' })
  findOne(@Param('_id') _id: string) {
    return this.paymentTypeService.findOne(_id);
  }

  @Patch(':_id')
  @ApiOperation({ summary: 'Update Payment Type' })
  @ApiParam({ name: '_id', type: String, description: 'Payment Type ObjectId' })
  @ApiBody({ type: UpdatePaymentTypeDto })
  @ApiResponse({
    status: 200,
    description: 'Payment type updated successfully',
  })
  update(@Param('_id') _id: string, @Body() updateDto: UpdatePaymentTypeDto) {
    return this.paymentTypeService.update(_id, updateDto);
  }

  @Delete(':_id')
  @ApiOperation({ summary: 'Delete Payment Type' })
  @ApiParam({ name: '_id', type: String, description: 'Payment Type ObjectId' })
  @ApiResponse({
    status: 200,
    description: 'Payment type deleted successfully',
  })
  remove(@Param('_id') _id: string) {
    return this.paymentTypeService.remove(_id);
  }
}