import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private employeesService: EmployeesService, private skillsService: SkillsService) { }

  skills: Skill[] = [];
  
  ngOnInit(): void {
    this.skillsService.GetAll().subscribe(
      skills => {        
        this.skills = skills;
      },
      err => {
        console.log(err);
      })
  }
}
