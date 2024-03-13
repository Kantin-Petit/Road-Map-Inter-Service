// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { adminGuard } from './admin.guard';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { of } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { authGuard } from './auth.guard';
// import { Router } from '@angular/router';
// import { UserRole } from '../models/user-model';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('AdminGuard', () => {
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
//         adminGuard,
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

//   // it('should return false and navigate to dashboard if role is user', () => {
//   //   authServiceSpy.verifyToken.and.returnValue(of({ accessToken: 'exampleToken' }));
//   //   authServiceSpy.getRole.and.returnValue('user' as UserRole);
//   //   const canActivate = adminGuard(route, state);

//   //   expect(canActivate).toEqual(false);
//   // });

//   // it('should return true and navigate if role is admin', () => {
//   //   authServiceSpy.verifyToken.and.returnValue(of({ accessToken: 'exampleToken' }));
//   //   authServiceSpy.getRole.and.returnValue('admin' as UserRole);
//   //   const canActivate = adminGuard(route, state);

//   //   expect(canActivate).toEqual(true);
//   // });

//   // it('should return true and navigate if role is admin_service', () => {
//   //   authServiceSpy.verifyToken.and.returnValue(of({ accessToken: 'exampleToken' }));
//   //   authServiceSpy.getRole.and.returnValue('admin' as UserRole);
//   //   const canActivate = adminGuard(route, state);

//   //   expect(canActivate).toEqual(true);
//   // });
// });
