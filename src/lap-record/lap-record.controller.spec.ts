import { Test, TestingModule } from '@nestjs/testing';
import { LapRecordController } from './lap-record.controller';

describe('LapRecordController', () => {
  let controller: LapRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapRecordController],
    }).compile();

    controller = module.get<LapRecordController>(LapRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
