import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private url: string;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot) {
    // state es un objeto que contiene la ruta a la que queramos acceder state.url: "/rentals/secret"
    this.url = state.url;
    return this.checkIfCanNavigate(state.url);
  }
  private checkIfCanNavigate(stateUrl: string): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    }
    this.auth.redirectUrl = stateUrl;
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  private url: string;
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(_: any, state: RouterStateSnapshot) {
    // state es un objeto que contiene la ruta a la que queramos acceder state.url: "/rentals/secret"
    this.url = state.url;
    return this.checkIfCanNavigate(state.url);
  }

  private checkIfCanNavigate(stateUrl: string): boolean {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/rentals']);
      return false;
    }
    return true;
  }
}

/*
export declare interface CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}
*/
