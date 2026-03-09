import { Test, TestingModule } from '@nestjs/testing';
import { PeakHourService } from './peak-hour.service';

describe('PeakHourService', () => {
  let service: PeakHourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeakHourService],
    }).compile();

    service = module.get<PeakHourService>(PeakHourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
