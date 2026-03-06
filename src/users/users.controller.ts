import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create User
   */
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get All Users
   */
  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.usersService.findAll(Number(page), Number(limit));
  }

  /**
   * Get Single User
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Update User
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete User
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
