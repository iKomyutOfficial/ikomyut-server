import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TimeMatrixService } from './time-matrix.service';
import { TimeMatrix } from '../schemas/time-matrix.schema';

describe('TimeMatrixService', () => {
  let service: TimeMatrixService;

  const mockTimeMatrixModel = {
    new: jest.fn().mockResolvedValue({}),
    constructor: jest.fn().mockResolvedValue({}),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeMatrixService,
        {
          provide: getModelToken(TimeMatrix.name),
          useValue: mockTimeMatrixModel,
        },
      ],
    }).compile();

    service = module.get<TimeMatrixService>(TimeMatrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});