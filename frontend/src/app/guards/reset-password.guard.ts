import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenData = { token: route.params['token'] };

  return authService.checkToken(tokenData).pipe(
    map(reponse => {
      if (!reponse.accessToken) {
        router.navigate(['']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  );

}
