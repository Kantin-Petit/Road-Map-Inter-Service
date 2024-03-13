import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
  })

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
