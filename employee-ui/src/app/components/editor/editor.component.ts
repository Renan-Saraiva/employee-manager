import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { EmployeesService } from 'src/app/services/employees.service';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill';
import { Employee } from 'src/app/models/employee';
import { minAgeValidator } from 'src/app/validators/age.validator';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  form = this.fb.group({
    employeeId: [],
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.email],
    gender: [null, Validators.required],
    bornOn: [null, [Validators.required, minAgeValidator(18)]],
    skills: [[], Validators.required]
  });
  
  skills: Skill[] = [];
  error: boolean = false;  
  _employee: Employee;
  @Input("employee") set employee(value: Employee) {    
    if (value.employeeId == -1000) {
      this.form.reset();
      return;
    }
      
    this._employee = value;
    this.employeeChange();    
  }

  get employee(): Employee {
      return this._employee;
  }

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private skillsService: SkillsService
    ) { }
    
    
  ngOnInit(): void {  
    this.skillsService.GetAll().subscribe(
      skills => {        
        this.skills = skills;
      },
      err => {
        console.log(err);
      })
  }

  onSubmit() {
    this.error = false;
    var employee = new Employee(this.form.value);
    
    console.log(employee);

    if (employee.employeeId > 0){
      this.save(employee);
      return;
    }

    this.add(employee);
  }

  add(employee: Employee) {
    this.employeesService.Add(employee).subscribe(
      employee => {
        this.form.reset();
      },
      err => {
        this.error = true;
        console.log(err);
      }
    );
  }

  save(employee: Employee) {
    this.employeesService.Save(employee.employeeId, employee).subscribe(
      employee => {
        this.form.reset();
      },
      err => {
        this.error = true;
        console.log(err);
      }
    );
  }

  isInvalid(field) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  isInvalidAge() {
    return this.form.get("bornOn").hasError('minAgeValidator') && this.form.get("bornOn").touched;
  }

  formartData(data) {
    if (data)
      return new Date(data).toISOString().substring(0, 10);

    return null;
  }

  employeeChange() {
    let { employeeId, name, lastName, email, gender, bornOn: unformatBornOn, skills : arraySkills } = this._employee;
    const skills: number[] = arraySkills.map(skill => skill.skillId);
    const bornOn = this.formartData(unformatBornOn);    
    this.form.patchValue({employeeId, name, lastName, email, gender, skills, bornOn });
  }

}
