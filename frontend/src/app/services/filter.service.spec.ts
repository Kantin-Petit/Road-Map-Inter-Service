import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        FilterService,
      ]
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
