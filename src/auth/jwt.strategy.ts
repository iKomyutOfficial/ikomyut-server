import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins } from '../schemas/admin.schema';
import { Drivers } from '../schemas/drivers.schema';
import { Users } from '../schemas/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(Drivers.name) private driverModel: Model<Drivers>,
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(Admins.name) private adminModel: Model<Admins>,
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
    const user = await this.userModel.findById(payload.sub);
    const admin = await this.adminModel.findById(payload.sub);

    const account: any = driver || user || admin;

    if (!account || account.authToken !== token) {
      throw new UnauthorizedException('Token is no longer valid');
    }

    return {
      id: account._id,
      mobnum: account.mobnum || null,
      username: account.username || null,
      email: account.email || null,
      role: payload.type,
    };
  }
}
