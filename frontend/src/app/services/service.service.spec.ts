import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceService } from './service.service';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';
import { ServiceModel } from '../models/service-model';

describe('ServiceService', () => {
  let service: ServiceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService]
    });

    service = TestBed.inject(ServiceService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all services', () => {
    const dummyServices: ServiceModel[] = [
      { id: 1, name: 'Service 1', image: 'image1.jpg', description: 'Description 1' },
      { id: 2, name: 'Service 2', image: 'image2.jpg', description: 'Description 2' }
    ];

    service.getAllService().subscribe(services => {
      expect(services.length).toBe(2);
      expect(services).toEqual(dummyServices);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SERVICE}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyServices);
  });

  it('should fetch one service by id', () => {
    const dummyService: ServiceModel = { id: 1, name: 'Service 1', image: 'path/to/image', description: 'Description 1' };

    service.getOneService(1).subscribe(service => {
      expect(service).toEqual(dummyService);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SERVICE}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyService);
  });

  it('should create a service', () => {
    const newService: ServiceModel = { id: 3, name: 'New Service', image: 'path/to/image', description: 'New Description' };

    service.createservice(newService).subscribe(service => {
      expect(service).toEqual(newService);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SERVICE}`);
    expect(req.request.method).toBe('POST');
    req.flush(newService);
  });

  it('should update a service', () => {
    const updatedService: ServiceModel = { id: 1, name: 'Updated Service', image: 'path/to/image', description: 'Updated Description' };

    service.updateservice(1, updatedService).subscribe(service => {
      expect(service).toEqual(updatedService);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SERVICE}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedService);
  });

  it('should delete a service', () => {
    const deletedService: ServiceModel = { id: 1, name: 'Service 1', image: 'path/to/image', description: 'Description 1' };

    service.deleteservice(1).subscribe(service => {
      expect(service).toEqual(deletedService);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SERVICE}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedService);
  });
});
