import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { forbiddenEmailValidator, sameAsValidator } from './functions';

@Directive({
  selector: '[sameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameAsDirective,
      multi: true,
    },
  ],
})
export class SameAsDirective implements Validator {
  @Input('sameAs') controls: string[];

  validate(control: FormGroup): ValidationErrors | null {
    return this.controls && this.controls.length === 2
      ? sameAsValidator(this.controls)(control)
      : null;
  }
}
