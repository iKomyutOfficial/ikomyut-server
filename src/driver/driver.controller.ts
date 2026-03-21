import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Logger,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Drivers } from '../schemas/drivers.schema';
import { DriversService } from './driver.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PersonalRequirementsDto } from './dto/personal-requirements.dto';
import { TransportRequirementsDto } from './dto/transport-requirements.dto';

@ApiTags('Drivers')
@Controller('drivers')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DriversController {
  private readonly logger = new Logger(DriversController.name);

  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new driver' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 201,
    description: 'Driver created successfully',
    type: Drivers,
  })
  create(@Body() createDriverDto: CreateDriverDto): Promise<Drivers> {
    this.logger.log(`Creating driver`, JSON.stringify(createDriverDto));
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @Roles('admin') // only drivers can access
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @CurrentUser() user: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const mobile = user?.mobnum || 'unknown';
    const userType = user?.role || 'unknown';
    this.logger.log(
      `Mobile ${mobile} w/ type ${userType} fetching drivers, page=${page}, limit=${limit}`,
    );
    return this.driversService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiResponse({ status: 200, description: 'Driver found', type: Drivers })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  findOne(@Param('id') id: string): Promise<Drivers> {
    this.logger.log(`Fetching driver by ID`, id);
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiBody({ type: UpdateDriverDto })
  @ApiResponse({
    status: 200,
    description: 'Driver updated successfully',
    type: Drivers,
  })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Drivers> {
    this.logger.log(
      `Updating driver`,
      `id=${id}`,
      JSON.stringify(updateDriverDto),
    );
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver unique ID' })
  @ApiResponse({ status: 200, description: 'Driver deleted successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  remove(@Param('id') id: string): Promise<void> {
    this.logger.warn(`Deleting driver`, id);
    return this.driversService.remove(id);
  }

  @Patch(':id/personal-requirements')
  @ApiOperation({ summary: 'Update personal requirements' })
  @ApiBody({ type: PersonalRequirementsDto })
  updatePersonal(
    @Param('id') id: string,
    @Body() body: Partial<PersonalRequirementsDto>, // allow partial updates
  ) {
    this.logger.log(
      `PATCH personal requirements for driver ${id}: ${JSON.stringify(body)}`,
    );
    return this.driversService.updatePersonalRequirements(id, body);
  }

  @Patch(':id/transport-requirements')
  @ApiOperation({ summary: 'Update transport requirements' })
  @ApiBody({ type: TransportRequirementsDto })
  updateTransport(@Param('id') id: string, @Body() body: any) {
    this.logger.log(
      `PATCH transport requirements for driver ${id}: ${JSON.stringify(body)}`,
    );
    return this.driversService.updateTransportRequirements(id, body);
  }
}
