import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderName'
})
export class GenderNamePipe implements PipeTransform {

  transform(gender: number, ...args: unknown[]): string {
    return gender == 1 ? "Feminino" : "Masculino";
  }

}
