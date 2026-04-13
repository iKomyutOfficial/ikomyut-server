import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Discounts')
@Controller('discounts')
// @ApiBearerAuth('access-token')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  @Roles('rider', 'driver')
  @ApiOperation({ summary: 'Create discount' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createDto: CreateDiscountDto) {
    return this.discountsService.create(createDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all discounts' })
  findAll() {
    return this.discountsService.findAll();
  }

  @Get('rider/:riderId')
  @Roles('admin', 'driver', 'rider')
  @ApiOperation({ summary: 'Get discount by riderId' })
  findByRiderId(@Param('riderId') riderId: string) {
    return this.discountsService.findByRiderId(riderId);
  }

  @Get(':id')
  // @Roles('admin', 'driver', 'rider')
  @ApiOperation({ summary: 'Get single discount' })
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'rider')
  @ApiOperation({ summary: 'Update discount' })
  update(@Param('id') id: string, @Body() updateDto: UpdateDiscountDto) {
    return this.discountsService.update(id, updateDto);
  }

  // @Delete(':id')
  // @Roles('admin')
  // @ApiOperation({ summary: 'Delete discount' })
  // remove(@Param('id') id: string) {
  //   return this.discountsService.remove(id);
  // }
}
