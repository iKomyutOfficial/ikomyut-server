import { Test, TestingModule } from '@nestjs/testing';
import { ConductorsController } from './conductors.controller';

describe('ConductorsController', () => {
  let controller: ConductorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConductorsController],
    }).compile();

    controller = module.get<ConductorsController>(ConductorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
