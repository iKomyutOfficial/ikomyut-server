import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Admins, AdminsDocument } from '../schemas/admin.schema';
import { Drivers, DriversDocument } from '../schemas/drivers.schema';
import { Users, UsersDocument } from '../schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admins.name) private adminsModel: Model<AdminsDocument>,
    @InjectModel(Drivers.name) private driversModel: Model<DriversDocument>,
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
    // private readonly authGateway: AuthGateway,
  ) {}
}
