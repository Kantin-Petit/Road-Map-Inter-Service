import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { loginGuard } from './login.guard';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(async () => {
    authServiceSpy = TestBed.inject(jasmine.createSpyObj('AuthService', ['verifyToken']));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        loginGuard,
        { provide: AuthService, useValue : authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
  });
  
  it('should return true and not navigate if token is not present', () => {
    // authServiceSpy.verifyToken.and.returnValue(of({}));
    // const canActivate = loginGuard(route, state);

    // expect(canActivate).toEqual(true);
  });
  
  it('should return false and navigate to home if token is present', () => {
    // authServiceSpy.verifyToken.and.returnValue(of({ accessToken: 'exampleToken' }));
    // const canActivate = loginGuard(route, state);

    // expect(canActivate).toEqual(false);
  });
});
