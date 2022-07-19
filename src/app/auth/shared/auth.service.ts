import { Injectable } from '@angular/core';
import { RegisterForm } from './register-form.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(registerForm: RegisterForm): Observable<any> {
    // alert(JSON.stringify(registerForm));

    return this.http.post('/api/v1/users/register', registerForm).pipe(
      catchError((responseError: HttpErrorResponse) => {
        return throwError(() => responseError.error.message);
      })
    );
  }

  login() {}
}
