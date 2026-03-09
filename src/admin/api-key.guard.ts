import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private validKeys: string[];

  constructor(private readonly configService: ConfigService) {
    // Load multiple keys from env, split by comma
    const keys = this.configService.get<string>('ADMIN_API_KEYS');
    this.validKeys = keys ? keys.split(',').map((k) => k.trim()) : [];
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || !this.validKeys.includes(apiKey)) {
      throw new ForbiddenException('Invalid credentials');
    }

    return true;
  }
}
