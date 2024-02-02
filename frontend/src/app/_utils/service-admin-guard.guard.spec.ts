import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { serviceAdminGuardGuard } from './service-admin-guard.guard';

describe('serviceAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => serviceAdminGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
