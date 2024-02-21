import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserModel, UserRole } from '../models/user-model';
import { environment } from 'src/environments/environment';
import { API } from 'src/app/routes/api';

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;
  let apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shold get all users', () => {
    const mockUsers: UserModel[] = [
      { 
        id: 1,
        email: 'test1@example.com',
        first_name: 'User',
        last_name: 'One',
        password: 'password1',
        role: UserRole.ADMIN,
        service_id: 1,
        Service: { name: 'Service One' }
      },
      { 
        id: 2,
        email: 'test2@example.com',
        first_name: 'User',
        last_name: 'Two',
        password: 'password2',
        role: UserRole.USER,
        service_id: 2,
        Service: { name: 'Service Two' }
      }
    ];

    service.getAllUser().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = http.expectOne(`${apiUrl}/${API.USER}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
