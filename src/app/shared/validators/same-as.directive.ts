import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { sameAsValidator } from './functions';

@Directive({
  selector: '[sameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameAsDirective,
      /**
       * When multi=true, injector returns an array of instances. This is useful to allow multiple
       * providers spread across many files to provide configuration information to a common token.
       */
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
