import { Skill } from './skill';

export class Employee {
    employeeId: number;
    name: string;
    lastName: string;
    email?: string;
    bornOn: Date;
    age: number;
    skills: Skill[];
    gender: number;
}