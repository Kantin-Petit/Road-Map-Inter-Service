import { TestBed } from '@angular/core/testing';

import { ThematicService } from './thematic.service';

describe('SubjectService', () => {
  let service: ThematicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThematicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
