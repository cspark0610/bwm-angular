import { Component, OnDestroy, OnInit } from '@angular/core';
//import { sameAsValidator } from '../../shared/validators/functions';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  notifyMessage: string;
  notifyMessageTimer: number;
  error: { message: string; detail: string };
  constructor(
    private formBuilder: FormBuilder,
    // class ActivatedRoute: para obtener los parametros de la url
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkLoginNotifyMessage();
  }

  checkLoginNotifyMessage() {
    //la instancia de ActivatedRoute debe user el metodo subscribe para capturar queryParams
    this.route.queryParams.subscribe((params) => {
      this.notifyMessage = params['notifyMessage']
        ? params['notifyMessage']
        : null;

      // quiero usar un setTimeout para borrar el mensaje de notificacion despues 2 segundos
      this.notifyMessageTimer = window.setTimeout(() => {
        // quiero navegar a la misma ruta( [] vacio ) pero que ahora la url no tenga el queryParams sin el mensaje de notificacion
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { notifyMessage: null },
          queryParamsHandling: 'merge',
        });
        // por ultimo reasigmamos el notifyMesage a null
        this.notifyMessage = '';
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    // cuando se destruya el componente Login, necesito hacer un clearTimeout de la referencia creada al setTimeout
    this.notifyMessageTimer && window.clearTimeout(this.notifyMessageTimer);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // si quisieramos usar el sameAsValidator, debemos agregarlo al formBuilder
    // {
    //   validators: [sameAsValidator(['password', 'email'])],
    // }
  }

  login() {
    if (this.loginForm.invalid) return;
    return this.authService.login(this.loginForm.value).subscribe({
      error: (err) => {
        //console.log(err, 'err');
        this.error = err;
      },
      complete: () => {
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
          this.authService.redirectUrl = '';
        } else {
          this.router.navigate(['/rentals']);
        }
      },
    });
  }

  /**
   * ahora la prop email es accesible dentro de cualq tag, se usa con la directiva *ngIf
   */
  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get diagnostic(): string {
    return JSON.stringify(this.loginForm.value);
  }
}
