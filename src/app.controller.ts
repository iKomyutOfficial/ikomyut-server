import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from './auth/decorators/roles.decorator';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  // @Roles('admin')
  @ApiOperation({ summary: 'Check service health status' })
  checkHealth() {
    this.logger.log('Health check endpoint called');
    const status = this.appService.getHealthStatus();
    this.logger.debug(`Returning health status: ${JSON.stringify(status)}`);
    return status;
  }

  @Get('driver-status')
  @Roles('driver') // Only drivers can access
  getDriverStatus() {
    return { message: 'Driver-specific endpoint' };
  }

  @Get('user-status')
  @Roles('user') // Only users can access
  getUserStatus() {
    return { message: 'User-specific endpoint' };
  }
}
