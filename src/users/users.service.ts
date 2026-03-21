import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const existing = await this.userModel.findOne({
      mobnum: createUserDto.mobnum,
    });
    if (existing) {
      throw new ConflictException('Mobile number already exists');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).lean(),
      this.userModel.countDocuments(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate({ id }, updateUserDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findOneAndDelete({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User deleted successfully',
    };
  }

  async findByMobnum(mobnum: string): Promise<Users> {
    const user = await this.userModel.findOne({ mobnum }).exec();
    if (!user) {
      throw new NotFoundException(
        `User with mobile number ${mobnum} not found`,
      );
    }
    return user;
  }
}
