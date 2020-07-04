import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../models/skill';

@Pipe({
  name: 'skillsName'
})
export class SkillsNamePipe implements PipeTransform {

  transform(skills: Skill[], ...args: unknown[]): unknown {    
    return skills.map(skill => " " + (<Skill[]>args[0]).filter(skillIn => skillIn.skillId == skill.skillId).pop().name).concat();
  }


}
