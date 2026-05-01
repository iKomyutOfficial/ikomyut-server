import { Test, TestingModule } from '@nestjs/testing';
import { LapRecordService } from './lap-record.service';

describe('LapRecordService', () => {
  let service: LapRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LapRecordService],
    }).compile();

    service = module.get<LapRecordService>(LapRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
