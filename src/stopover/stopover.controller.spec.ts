import { Test, TestingModule } from '@nestjs/testing';
import { StopoverController } from './stopover.controller';

describe('StopoverController', () => {
  let controller: StopoverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StopoverController],
    }).compile();

    controller = module.get<StopoverController>(StopoverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
