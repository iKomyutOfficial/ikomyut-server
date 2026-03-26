import { Test, TestingModule } from '@nestjs/testing';
import { TrafficIntensityService } from './traffic-intensity.service';

describe('TrafficIntensityService', () => {
  let service: TrafficIntensityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficIntensityService],
    }).compile();

    service = module.get<TrafficIntensityService>(TrafficIntensityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
