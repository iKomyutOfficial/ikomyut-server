import { Test, TestingModule } from '@nestjs/testing';
import { LapCounterSettingsService } from './lap-counter-settings.service';

describe('LapCounterSettingsService', () => {
  let service: LapCounterSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LapCounterSettingsService],
    }).compile();

    service = module.get<LapCounterSettingsService>(LapCounterSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
