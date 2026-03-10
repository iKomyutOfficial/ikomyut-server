import { Test, TestingModule } from '@nestjs/testing';
import { TnvsConfigurationService } from './tnvs-configuration.service';

describe('TnvsConfigurationService', () => {
  let service: TnvsConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TnvsConfigurationService],
    }).compile();

    service = module.get<TnvsConfigurationService>(TnvsConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});