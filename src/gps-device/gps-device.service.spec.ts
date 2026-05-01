import { Test, TestingModule } from '@nestjs/testing';
import { GpsDeviceService } from './gps-device.service';

describe('GpsDeviceService', () => {
  let service: GpsDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsDeviceService],
    }).compile();

    service = module.get<GpsDeviceService>(GpsDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
