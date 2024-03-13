import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map((res) => {
      if (res.accessToken) {
        router.navigate(['']);
        return false
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['']);
      return of(false);
    })
  )

}
