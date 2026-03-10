import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeService } from './payment-type.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PaymentTypeService', () => {
  let service: PaymentTypeService;

  const mockPaymentTypeModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentTypeService,
        {
          provide: getModelToken('PaymentType'),
          useValue: mockPaymentTypeModel,
        },
      ],
    }).compile();

    service = module.get<PaymentTypeService>(PaymentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});