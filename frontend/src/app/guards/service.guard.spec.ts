import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ServiceGuard } from './service.guard';

describe('serviceAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => serviceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
