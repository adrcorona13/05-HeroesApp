import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (this.authService.auth.id) {
      //   return true;
      // }      
      // console.log('bloqueado por el canActivate');
      // return false;
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(isAuthenticated => {
            if (!isAuthenticated) {
              this.router.navigate(['./auth/login'])
            }
          })
        );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion();
      // if (this.authService.auth.id) {
      //   return true;
      // }      
      // console.log('bloqueado por el canload');
      // return false;
  }
}
