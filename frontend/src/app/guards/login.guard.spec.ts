import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('loginGuard', () => {
  let authService: AuthService

  const routerMock = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });
    authService = TestBed.inject(AuthService)
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


});
