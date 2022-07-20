import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AppDecorator } from './decorators';
import { AuthService } from './auth/shared/auth.service';

//@AppDecorator({ message: 'Hello world!!!' })
@Component({
  selector: 'bwm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authService: AuthService;
  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;
  }

  ngOnInit() {
    return this.authService.checkAuthenticationStatus();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/rentals']);
  }

  // public counter = 0;

  // public incrementCounter(event: any, incrementor: number): void {
  //   this.counter += incrementor;
  // }
  // public decrementCounter(event: any, decrementor: number): void {
  //   this.counter -= decrementor;
  // }
}
