import { Skill } from './skill';
import { isFormattedError } from '@angular/compiler';

export class Employee {
    
    employeeId?: number;
    name: string;
    lastName: string;
    email?: string;
    bornOn: Date;
    age: number;
    skills: Skill[];
    gender: number;

    public constructor(init?: Partial<Employee>) {
        Object.assign(this, init);
        this.skills = [];

        if (init && init.skills) {
            init.skills.forEach(element => {
                this.skills.push({
                    skillId: element as unknown as number
                });
            });
        }
    }
}