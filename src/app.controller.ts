import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth('access-token')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Check service health status' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-03-06T10:00:00.000Z',
        uptime: 12345,
      },
    },
  })
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
