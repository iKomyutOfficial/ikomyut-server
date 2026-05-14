import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from './auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';

@Controller()
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles('admin', 'employee')
  @ApiOperation({ summary: 'Check service health status' })
  checkHealth() {
    this.logger.log('Health check endpoint called');
    const status = this.appService.getHealthStatus();
    this.logger.debug(`Returning health status: ${JSON.stringify(status)}`);
    return status;
  }

  @Get('dashboard')
  @Roles('admin', 'employee')
  getDashboard(@Req() req) {
    return this.appService.getDashboardStats(req.user.companyId);
  }
}
