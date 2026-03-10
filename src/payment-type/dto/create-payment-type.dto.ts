export class CreatePaymentTypeDto {
  readonly paymentType: string;
  readonly description?: string;
  readonly isActive?: boolean;
}