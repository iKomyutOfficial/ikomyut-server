import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private model: Model<EmployeeDocument>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const employee = await this.model.create(dto);
    return this.excludeSensitive(employee);
  }

  async findAll() {
    const data = await this.model.find().exec();
    return data.map((e) => this.excludeSensitive(e));
  }

  async findOne(id: string) {
    const employee = await this.model.findById(id).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    return this.excludeSensitive(employee);
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Employee not found');
    return this.excludeSensitive(updated);
  }

  async remove(id: string) {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Employee not found');

    return { message: 'Deleted successfully' };
  }

  // 🔒 Remove sensitive fields
  private excludeSensitive(employee: EmployeeDocument) {
    const obj = employee.toObject();
    delete obj.password;
    delete obj.authToken;
    delete obj.currentSession;
    return obj;
  }
}
