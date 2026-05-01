import { Test, TestingModule } from '@nestjs/testing';
import { LapCounterSettingsController } from './lap-counter-settings.controller';

describe('LapCounterSettingsController', () => {
  let controller: LapCounterSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapCounterSettingsController],
    }).compile();

    controller = module.get<LapCounterSettingsController>(LapCounterSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
