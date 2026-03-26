import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create discount' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createDto: CreateDiscountDto) {
    return this.discountsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts' })
  findAll() {
    return this.discountsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single discount' })
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update discount' })
  update(@Param('id') id: string, @Body() updateDto: UpdateDiscountDto) {
    return this.discountsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete discount' })
  remove(@Param('id') id: string) {
    return this.discountsService.remove(id);
  }
}
