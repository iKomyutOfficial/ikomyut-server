import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(
      `Creating user with data: ${JSON.stringify(createUserDto)}`,
    );
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get all drivers' })
  findAll(@CurrentUser() user: any) {
    const mobile = user?.mobnum || 'unknown';
    const userType = user?.role || 'unknown';
    this.logger.log(
      `Mobile ${mobile} w/ type ${userType} fetching all drivers`,
    );
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching user with id: ${id}`);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(
      `Updating user ${id} with data: ${JSON.stringify(updateUserDto)}`,
    );
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete user' })
  // remove(@Param('id') id: string) {
  //   this.logger.warn(`Deleting user with id: ${id}`);
  //   return this.usersService.remove(id);
  // }
}
