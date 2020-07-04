import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

        if (isInvalidControl(control))
            return invalidResult(control);  
            
        return getAge(new Date(control.value)) >= minAge ? null : invalidResult(control);
    };

    function isInvalidControl(control: AbstractControl) : boolean {
        return !control.value || control.value === "";
    }

    function getAge(birthDate: Date): number {
        const today = new Date();        
        let years = today.getUTCFullYear() - birthDate.getUTCFullYear();
        const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
          years--;
        }

        return years;
    }

    function invalidResult(control: AbstractControl) : {[key: string]: any} {
        return  {'minAgeValidator': {value: control.value}};
    }
  }
