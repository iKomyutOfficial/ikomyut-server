import { Test, TestingModule } from '@nestjs/testing';
import { ConductorsService } from './conductors.service';

describe('ConductorsService', () => {
  let service: ConductorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConductorsService],
    }).compile();

    service = module.get<ConductorsService>(ConductorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
