import { Injectable } from '@angular/core';
import { RegisterForm } from './register-form.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp = 0;
  username = '';
  userId = '';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private decodedToken: DecodedToken;
  redirectUrl: string;

  constructor(private http: HttpClient) {
    this.decodedToken = new DecodedToken();
  }

  register(registerForm: RegisterForm): Observable<Object> {
    return this.http.post('/api/v1/users/register', registerForm).pipe(
      catchError(({ error }) => {
        return throwError(() => error.errors[0]);
      })
    );
  }

  login(loginForm: FormGroup): Observable<Object> {
    return this.http.post('/api/v1/users/login', loginForm).pipe(
      map((response: { token: string }) => {
        const savedTRoken = this.setTokenInLocalStorage(response.token);

        if (!savedTRoken)
          return throwError(() => new Error('Could not save token'));
        return savedTRoken;
      }),
      catchError(({ error }) => {
        return throwError(() => error?.errors[0]);
      })
    );
  }

  private setTokenInLocalStorage(token: string): string | null {
    // fisrt decode the token to get the user data
    const decodedToken = jwt.decodeToken(token);
    if (!decodedToken) return null;
    this.decodedToken = decodedToken;

    localStorage.setItem('bwm_auth_token', token);
    return token;
  }

  checkAuthenticationStatus(): boolean {
    const authToken = localStorage.getItem('bwm_auth_token');
    if (!authToken) return false;
    const decodedToken = jwt.decodeToken(authToken);
    if (!decodedToken) return false;
    this.decodedToken = decodedToken;

    return true;
  }

  logout() {
    localStorage.removeItem('bwm_auth_token');
    this.decodedToken = new DecodedToken();
  }

  get username(): string {
    return this.decodedToken.username;
  }

  get isAuthenticated(): boolean {
    // validar si el token esta expirado
    // si la hora actual es < menor que el timepo de expiracion , el token es valido y ek usuario sigue Authenticado
    const isAuthenticated = moment().isBefore(this.expiration);
    return isAuthenticated;
  }

  private get expiration(): moment.Moment {
    return moment.unix(this.decodedToken.exp);
  }
}
