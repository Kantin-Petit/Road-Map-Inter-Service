import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { InterceptorService } from './interceptor.service';
import { of } from 'rxjs';

describe('InterceptorService', () => {
  let authService: AuthService;
  let interceptor: InterceptorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        InterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    interceptor = TestBed.inject(InterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add authorization header with token if token exists', inject(
    [HttpClient, AuthService],
    (http: HttpClient, auth: AuthService) => {
      const dummyToken = 'dummyToken';
      spyOn(auth, 'getToken').and.returnValue(of(dummyToken));

      http.get('/some-url').subscribe();

      const httpRequest = httpMock.expectOne('/some-url');
      expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
      expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${dummyToken}`);

      httpRequest.flush({});
    }
  ));

  it('should not add authorization header if token does not exist', inject(
    [HttpClient, AuthService],
    (http: HttpClient, auth: AuthService) => {
      spyOn(auth, 'getToken').and.returnValue(of(null));

      http.get('/some-url').subscribe();

      const httpRequest = httpMock.expectOne('/some-url');
      expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

      httpRequest.flush({});
    }

  ));
});
