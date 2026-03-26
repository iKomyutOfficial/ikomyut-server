import { Test, TestingModule } from '@nestjs/testing';
import { RainydayService } from './rainyday.service';

describe('RainydayService', () => {
  let service: RainydayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RainydayService],
    }).compile();

    service = module.get<RainydayService>(RainydayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
