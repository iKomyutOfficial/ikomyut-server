import { Test, TestingModule } from '@nestjs/testing';
import { TrafficIntensityController } from './traffic-intensity.controller';

describe('TrafficIntensityController', () => {
  let controller: TrafficIntensityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrafficIntensityController],
    }).compile();

    controller = module.get<TrafficIntensityController>(TrafficIntensityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
