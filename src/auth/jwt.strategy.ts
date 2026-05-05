import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins } from '../admins/schemas/admin.schema';
import { Drivers } from '../drivers/schemas/drivers.schema';
import { Conductor } from '../conductors/schemas/conductor.schema';
import { Employee } from '../employee/schemas/employee.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(Conductor.name) private conductorModel: Model<Conductor>,
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid JWT payload');
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const driver = await this.driverModel.findById(payload.sub);
    const conductor = await this.conductorModel.findById(payload.sub);
    const admin = await this.adminModel.findById(payload.sub);
    const employee = await this.employeeModel.findById(payload.sub);

    const account: any = admin || conductor || driver || employee;

    if (!account || account.authToken !== token) {
      throw new UnauthorizedException('Token is no longer valid');
    }

    let role: string;

    if (admin) role = 'admin';
    else if (conductor) role = 'conductor';
    else if (driver) role = 'driver';
    else if (employee) role = 'employee';
    else role = 'unknown';

    return {
      id: account._id,
      mobnum: account.contactNumber || null,
      username: account.username || null,
      email: account.email || null,
      companyId: account.companyId || null,
      companyName: account.companyName || null,
      role,
    };
  }
}
