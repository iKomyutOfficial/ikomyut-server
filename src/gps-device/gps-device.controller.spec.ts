import { Test, TestingModule } from '@nestjs/testing';
import { GpsDeviceController } from './gps-device.controller';

describe('GpsDeviceController', () => {
  let controller: GpsDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpsDeviceController],
    }).compile();

    controller = module.get<GpsDeviceController>(GpsDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
