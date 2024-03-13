// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { of } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { authGuard } from './auth.guard';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { TestBed } from '@angular/core/testing';

// describe('AuthGuard', () => {
//   let authServiceSpy: jasmine.SpyObj<AuthService>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let route: ActivatedRouteSnapshot;
//   let state: RouterStateSnapshot;

//   beforeEach(async () => {
//     authServiceSpy = TestBed.inject(jasmine.createSpyObj('AuthService', ['verifyToken']));
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [
//         authGuard,
//         { provide: AuthService, useValue : authServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {

//     route = {} as ActivatedRouteSnapshot;
//     state = {} as RouterStateSnapshot;
//   });


//   // it('should return false and not navigate if token is not present', () => {
//   //   authServiceSpy.verifyToken.and.returnValue(of({}));
//   //   const canActivate = authGuard(route, state);

//   //   expect(canActivate).toEqual(false);
//   // });

//   // it('should return true and navigate to home if token is present', () => {
//   //   authServiceSpy.verifyToken.and.returnValue(of({ accessToken: 'exampleToken' }));
//   //   const canActivate = authGuard(route, state);

//   //   expect(canActivate).toEqual(true);
//   // });
// });
