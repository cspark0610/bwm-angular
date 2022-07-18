import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

// HOF
export function forbiddenEmailValidator(email: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden: boolean = email === control.value;
    return forbidden ? { forbiddenEmail: { value: control.value } } : null;
  };
}

export function sameAsValidator(controls: string[]): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const compare = control.get(controls[0])?.value;
    const compareTo = control.get(controls[1])?.value;
    return compare !== compareTo ? { sameAs: { value: control.value } } : null;
  };
}

/*
  export declare interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null;
  }
*/
