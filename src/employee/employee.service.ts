import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';


@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee> 
  ) {}
  
  createStudent(createEmpDto: CreateEmployeeDto): Promise<Employee> {
    const employee: Employee = new Employee();
    employee.name = createEmpDto.name;
    employee.email = createEmpDto.email;
    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({ id });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee: Employee = new Employee();
    employee.id = id;
    employee.name = updateEmployeeDto.name;
    employee.email = updateEmployeeDto.email;
    employee.address = updateEmployeeDto.address;
    return this.employeeRepository.save(employee);
  }

  remove(id: number) {
    return this.employeeRepository.softDelete(id)
  }
}
