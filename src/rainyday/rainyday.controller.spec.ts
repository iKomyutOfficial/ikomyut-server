import { Test, TestingModule } from '@nestjs/testing';
import { RainydayController } from './rainyday.controller';

describe('RainydayController', () => {
  let controller: RainydayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RainydayController],
    }).compile();

    controller = module.get<RainydayController>(RainydayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
