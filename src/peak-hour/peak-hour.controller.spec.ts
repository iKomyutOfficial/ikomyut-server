import { Test, TestingModule } from '@nestjs/testing';
import { PeakHourController } from './peak-hour.controller';

describe('PeakHourController', () => {
  let controller: PeakHourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeakHourController],
    }).compile();

    controller = module.get<PeakHourController>(PeakHourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
