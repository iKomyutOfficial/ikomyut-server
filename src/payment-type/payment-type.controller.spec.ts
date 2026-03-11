import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';

describe('PaymentTypeController', () => {
  let controller: PaymentTypeController;

  const mockPaymentTypeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTypeController],
      providers: [
        {
          provide: PaymentTypeService,
          useValue: mockPaymentTypeService,
        },
      ],
    }).compile();

    controller = module.get<PaymentTypeController>(PaymentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});