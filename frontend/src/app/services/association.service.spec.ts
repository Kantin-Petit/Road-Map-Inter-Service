import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssociationService } from './association.service';
import { environment } from 'src/environments/environment';
import { API } from 'src/app/routes/api';
import { AssociationModel } from '../models/association-model';

describe('AssociationService', () => {
  let service: AssociationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssociationService]
    });

    service = TestBed.inject(AssociationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create association', () => {
    const newAssociation: AssociationModel = { timeline_id: 3, thematic_id: 1 };

    service.createAssociation(newAssociation).subscribe(association => {
      expect(association).toEqual(newAssociation);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.ASSOCIATION}`);
    expect(req.request.method).toBe('POST');
    req.flush(newAssociation);
  });

  it('should delete association', () => {
    const timelineId = 1;
    const thematicId = 2;
    const deletedAssociation: AssociationModel = { timeline_id: 3, thematic_id: 1 };

    service.deleteAssociation(timelineId, thematicId).subscribe(association => {
      expect(association).toEqual(deletedAssociation);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.ASSOCIATION}/${timelineId}/${thematicId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedAssociation);
  });
});
