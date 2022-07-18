import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { forbiddenEmailValidator } from './functions';

// [forbiddenEmail]="'some@email.com'" new selector
@Directive({
  selector: '[forbiddenEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenEmailDirective,
      multi: true,
    },
  ],
})
export class ForbiddenEmailDirective implements Validator {
  @Input('forbiddenEmail') forbiddenEmail: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.forbiddenEmail
      ? forbiddenEmailValidator(this.forbiddenEmail)(control)
      : null;
  }
}

// ForbiddenEmailDirective has to be DECLARED IN  auth.module
