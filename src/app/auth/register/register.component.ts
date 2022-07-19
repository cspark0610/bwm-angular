import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../shared/register-form.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error = '';
  registerFormData: RegisterForm;
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerFormData = new RegisterForm();
  }

  register(form: NgForm) {
    if (form.invalid) return;
    this.authService.register(this.registerFormData).subscribe({
      error: (err) => {
        this.error = err;
      },
      complete: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  validateInputs(form: NgForm) {
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsDirty();
    });
  }

  get diagnostic(): string {
    return JSON.stringify(this.registerFormData);
  }
}

/* NgForm:
NgForm {_rawValidators: Array(0), _rawAsyncValidators: Array(0), _onDestroyCallbacks: Array(0), submitted: false, _directives: Set(4), …}
form: FormGroup {_pendingDirty: false, _hasOwnPendingAsyncValidator: false, _pendingTouched: false, _parent: null, _onCollectionChange: ƒ, …}
ngSubmit: EventEmitter_ {closed: false, currentObservers: Array(0), observers: Array(0), isStopped: false, hasError: false, …}
submitted: true
__ngContext__: 4
_directives: Set(4) {NgModel, NgModel, NgModel, NgModel}
_onDestroyCallbacks: []
_rawAsyncValidators: []
_rawValidators: []
asyncValidator: (…)
control: (…)
controls: (…)
dirty: (…)
disabled: (…)
enabled: (…)
errors: null
formDirective: NgForm
invalid: false
path: Array(0)
pending: false
pristine: false
status: "VALID"
statusChanges: EventEmitter_
touched: true
untouched: false
valid: (…)
validator: (…)
value: (…)
valueChanges: (…)
*/
