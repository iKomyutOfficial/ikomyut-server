import { BadRequestException } from '@nestjs/common';

export async function validateUniqueFields(
  model: any,
  dto: any,
  companyId: string,
): Promise<void> {
  const existing = await model.findOne({
    $or: [
      { username: dto.username },
      {
        contactNumber: dto.contactNumber,
        companyId,
      },
      {
        email: dto.email,
        companyId,
      },
      {
        licenseNumber: dto.licenseNumber,
        companyId,
      },
    ],
  });

  if (!existing) return;

  if (existing.username === dto.username) {
    throw new BadRequestException('Username already exists');
  }

  // if (
  //   existing.contactNumber === dto.contactNumber &&
  //   existing.companyId.toString() === companyId.toString()
  // ) {
  //   throw new BadRequestException(
  //     'Mobile number already exists in your company',
  //   );
  // }

  if (
    existing.email === dto.email &&
    existing.companyId.toString() === companyId.toString()
  ) {
    throw new BadRequestException('Email already exists in your company');
  }

  // if (
  //   existing.licenseNumber === dto.licenseNumber &&
  //   existing.companyId.toString() === companyId.toString()
  // ) {
  //   throw new BadRequestException(
  //     'License Number already exists in your company',
  //   );
  // }
}
