import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { Subject } from 'rxjs';

describe('FilterService', () => {
  let service: FilterService;
  let filterChangeSubject: Subject<void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
    service = TestBed.inject(FilterService);
    filterChangeSubject = new Subject<void>();
    spyOn(service, 'getFilterChangeObservable').and.returnValue(filterChangeSubject.asObservable());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set services filter and emit change', () => {
    const status = true;
    const spy = spyOn(filterChangeSubject, 'next').and.callThrough();
  
    service.setServicesFilter(status);
  
    expect(service.isFullLoad).toBe(status);
    // Expected spy next to have been called.
    expect(spy).toHaveBeenCalled();
  });

  it('should reset variables', () => {
    service.checkedServices = [1, 2, 3];
    service.checkedThematics = [4, 5, 6];

    service.resetVariables();

    expect(service.checkedServices.length).toBe(0);
    expect(service.checkedThematics.length).toBe(0);
  });

  it('should get service id', () => {
    const value = 123;

    expect(service.getServiceId(value)).toBe(value);
  });
});
