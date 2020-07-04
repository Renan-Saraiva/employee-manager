import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill';
import { Employee } from 'src/app/models/employee';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'employees-grid',
  templateUrl: './employees-grid.component.html',
  styleUrls: ['./employees-grid.component.css']
})
export class EmployeesGridComponent implements OnInit {

  constructor(private employeesService: EmployeesService, private skillsService: SkillsService) { }

  @Output() onEmployeeChange: EventEmitter<Employee> = new EventEmitter();
  skills: Skill[] = [];
  employees: Employee[] = [];
  selectedEmployeeId: number = 0;

  ngOnInit(): void {

    this.employeesService.AddListenerEvent().subscribe(
      employee => { this.employees.push(employee);  console.log(employee);}
    )

    this.employeesService.SaveListenerEvent().subscribe(
      employee => {
        const index = this.employees.findIndex(ep => ep.employeeId == employee.employeeId);
        console.log(employee);
        this.employees[index] = employee;
      } 
    )

    this.GetAll();
  }

  GetAll(): void {
    this.skillsService.GetAll().subscribe(
      skills => {        
        this.skills = skills;
        this.ListEmployess();
      },
      err => console.log(err)
    )
  }

  ListEmployess(): void {
    this.employeesService.GetAll().subscribe(
      employees => this.employees = employees,
      err => console.log(err)
    )
  }
  
  ListByGender(gender: number): void {    
    this.selectedEmployeeId = 0;
    
    if (gender == 0) {
      this.ListEmployess();
      return;
    }

    this.employeesService.GetByGender(gender).subscribe(
      employees => this.employees = employees,
      err => console.log(err)
    )
  }

  ListByAge(age: number): void {
    this.selectedEmployeeId = 0;

    if (age <= 0) {
      this.ListEmployess();
      return;
    }

    this.employeesService.GetByAge(age).subscribe(
      employees => this.employees = employees,
      err => console.log(err)
    )
  }

  ListByName(name: string): void {
    this.selectedEmployeeId = 0;

    if (!name || name.length == 0) {
      this.ListEmployess();
      return;
    }

    this.employeesService.GetByName(name).subscribe(
      employees => this.employees = employees,
      err => console.log(err)
    )
  }

  EditEmployee(employee: Employee): void {
    this.selectedEmployeeId = employee.employeeId;
    this.onEmployeeChange.emit(employee);
  }

  DeleteEmployee(employee: Employee): void {
    this.employeesService.Delete(employee.employeeId).subscribe(
      () => {
        if (employee.employeeId == this.selectedEmployeeId) {
          this.selectedEmployeeId = 0;
          this.onEmployeeChange.emit(new Employee({employeeId: -1000 }));
        }

        this.employees = this.employees.filter(emp => emp.employeeId != employee.employeeId);
      },
      err => {
        console.log(err);
      }
    )
  }
}
