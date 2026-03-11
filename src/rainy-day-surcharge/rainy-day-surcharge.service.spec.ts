import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RainyDaySurchargeService } from './rainy-day-surcharge.service';
import { RainyDaySurcharge } from '../schemas/rainy-day-surcharge.schema';

describe('RainyDaySurchargeService', () => {
  let service: RainyDaySurchargeService;

  const mockRainyDaySurchargeModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    countDocuments: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RainyDaySurchargeService,
        {
          provide: getModelToken(RainyDaySurcharge.name),
          useValue: mockRainyDaySurchargeModel,
        },
      ],
    }).compile();

    service = module.get<RainyDaySurchargeService>(RainyDaySurchargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
