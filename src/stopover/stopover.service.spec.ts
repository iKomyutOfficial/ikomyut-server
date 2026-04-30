import { Test, TestingModule } from '@nestjs/testing';
import { StopoverService } from './stopover.service';

describe('StopoverService', () => {
  let service: StopoverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StopoverService],
    }).compile();

    service = module.get<StopoverService>(StopoverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
