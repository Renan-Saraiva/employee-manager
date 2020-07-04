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
    this.skillsService.GetAll().subscribe(
      skills => {        
        this.skills = skills;
        this.ListEmployess();
      },
      err => {
        console.log(err);
      })
  }

  ListEmployess(): void {
    this.employeesService.GetAll().subscribe(
      employees => {        
        this.employees = employees;
      },
      err => {
        console.log(err);
      })
  }
  
  ListByGender(gender: number): void {    
    this.selectedEmployeeId = 0;
    
    if (gender == 0) {
      this.ListEmployess();
      return;
    }

    this.employeesService.GetByGender(gender).subscribe(
      employees => {        
        this.employees = employees;
      },
      err => {
        console.log(err);
      })
  }

  ListByAge(age: number): void {
    this.selectedEmployeeId = 0;

    if (age <= 0) {
      this.ListEmployess();
      return;
    }

    this.employeesService.GetByAge(age).subscribe(
      employees => {        
        console.log(employees);
        this.employees = employees;
      },
      err => {
        console.log(err);
      })
  }

  EmployeeClick(employee: Employee): void {
    this.selectedEmployeeId = employee.employeeId;
    this.onEmployeeChange.emit(employee);
  }
}
