import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Bookings')
@Controller('bookings')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookingsController {
  private readonly logger = new Logger(BookingsController.name);

  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('rider', 'driver')
  @ApiOperation({ summary: 'Create booking' })
  create(@Body() dto: CreateBookingDto) {
    this.logger.log(`Creating booking`);
    return this.bookingsService.createBooking(dto);
  }

  @Get()
  @Roles('admin', 'driver')
  @ApiOperation({ summary: 'Get all drivers' })
  findAll(
    @CurrentUser() user: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5000,
  ) {
    const mobile = user?.mobnum || 'unknown';
    const userType = user?.role || 'unknown';

    this.logger.log(
      `Mobile ${mobile} w/ type ${userType} fetching all bookings (page: ${page}, limit: ${limit})`,
    );

    return this.bookingsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update booking' })
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingsService.update(id, dto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete booking' })
  // remove(@Param('id') id: string) {
  //   return this.bookingsService.remove(id);
  // }
}
