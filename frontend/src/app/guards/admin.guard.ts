import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.hasToken$.pipe(
    map(hasOne => {
      console.log('hasToken', hasOne);
      if (hasOne && (authService.getRole() === 'admin') || authService.getRole() === 'admin_service') {
        return true;
      }
      router.navigate(['dashboard']);
      return false;
    })
  );

}
