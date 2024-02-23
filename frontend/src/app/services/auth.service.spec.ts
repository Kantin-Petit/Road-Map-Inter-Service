import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { API } from 'src/app/routes/api';
import { UserModel, UserRole } from '../models/user-model';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    const token = 'testToken';

    service.setToken(token);
    service.getToken().subscribe(t => {
      expect(t).toEqual(token);
    });
  });

  it('should register user', () => {
    const userData = {
      email: 'test2@example.com',
      firstName: 'User',
      lastName: 'Two',
      password: 'password2',
      role: UserRole.USER,
      service: 2,
    };

    service.register(userData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.REGISTER}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should login user', () => {
    const userData = { email: 'testuser', password: 'testpassword' };

    service.login(userData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.SIGNIN}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should verify token', () => {
    service.verifyToken().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.TOKEN}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should set and get user', () => {
    const user: UserModel = {
      id: 2,
      email: 'test2@example.com',
      first_name: 'User',
      last_name: 'Two',
      password: 'password2',
      role: UserRole.USER,
      service_id: 2,
      Service: { name: 'Service Two' }
    };

    service.setUser(user);
    const retrievedUser = service.getUser();
    expect(retrievedUser).toEqual(user);
  });

  it('should logout user', () => {
    service.logout();
    const req = http.expectOne(`${environment.apiUrl}/${API.SIGNOUT}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
    // Expected Observable({ source: BehaviorSubject({ closed: false, currentObservers: [  ], observers: [  ], isStopped: false, hasError: false, thrownError: null, _value: null }) }) to be falsy.
    expect(service.getToken()).toBeFalsy();
    expect(service.getUser()).toEqual(new UserModel());
  });

  it('should get user role', () => {
    const user: UserModel = {
      id: 2,
      email: 'test2@example.com',
      first_name: 'User',
      last_name: 'Two',
      password: 'password2',
      role: UserRole.USER,
      service_id: 2,
      Service: { name: 'Service Two' }
    };
    service.setUser(user);
    expect(service.getRole()).toEqual('user');
  });

});
