import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset variables properly', () => {
    service.checkedServices = [1, 2, 3];
    service.checkedThematics = [4, 5, 6];

    service.resetVariables();

    expect(service.checkedServices.length).toEqual(0);
    expect(service.checkedThematics.length).toEqual(0);
  });

  it('should return service ID', () => {
    const id = 5;
    expect(service.getServiceId(id)).toEqual(id);
  });

  it('should set services filter and trigger filter change', () => {
    const status = true;
    const filterChangeSpy = spyOn(service.getFilterChangeThematic(), 'next').and.callThrough();

    service.setServicesFilter(status);

    expect(service.isFullLoad).toEqual(status);
    expect(filterChangeSpy).toHaveBeenCalled();
  });

  it('should emit filter change observable', (done: DoneFn) => {
    service.getFilterChangeObservable().subscribe(() => {
      done();
    });

    service.setServicesFilter(true);
  });
});
