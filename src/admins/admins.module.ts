import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admins, AdminsSchema } from './schemas/admin.schema';
import { Drivers, DriversSchema } from '../drivers/schemas/drivers.schema';
import {
  Conductor,
  ConductorSchema,
} from '../conductors/schemas/conductor.schema';
import { Unit, UnitSchema } from '../unit/schemas/unit.schema';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admins.name, schema: AdminsSchema },
      { name: Drivers.name, schema: DriversSchema },
      { name: Conductor.name, schema: ConductorSchema },
      { name: Unit.name, schema: UnitSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [MongooseModule],
})
export class AdminsModule {}
