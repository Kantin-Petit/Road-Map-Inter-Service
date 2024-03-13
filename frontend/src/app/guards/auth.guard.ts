import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getToken().pipe(
    map(hasOne => {
      if (!hasOne) {
        router.navigate(['connexion']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['connexion']);
      return of(false);
    })

  );

}
