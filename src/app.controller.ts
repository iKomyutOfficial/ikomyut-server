import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
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
    return this.appService.getHealthStatus();
  }
}
