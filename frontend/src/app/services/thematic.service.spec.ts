import { TestBed } from '@angular/core/testing'; 

import { ThematicService } from './thematic.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThematicModel } from '../models/thematic-model';
import { environment } from 'src/environments/environment';
import { API } from '../routes/api';

describe('ThematicService', () => {
  let service: ThematicService;
  let http: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThematicService]
    });
    service = TestBed.inject(ThematicService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all thematics', () => {
    const dummyThematics: ThematicModel[] = [
      { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#ff0000' },
      { id: 2, name: 'Thematic 2', description: 'Description 2', color: '#00ff00' }
    ];

    service.getAllthematic().subscribe(thematics => {
      expect(thematics.length).toBe(2);
      expect(thematics).toEqual(dummyThematics);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.THEMATIC}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyThematics);
  });

  it('should fetch one thematic by id', () => {
    const dummyThematic: ThematicModel = { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#ff0000' };

    service.getOnethematic(1).subscribe(thematic => {
      expect(thematic).toEqual(dummyThematic);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.THEMATIC}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyThematic);
  });

  it('should create a thematic', () => {
    const newThematic: ThematicModel = { id: 3, name: 'New Thematic', description: 'New Description', color: '#0000ff' };

    service.createthematic(newThematic).subscribe(thematic => {
      expect(thematic).toEqual(newThematic);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.THEMATIC}`);
    expect(req.request.method).toBe('POST');
    req.flush(newThematic);
  });

  it('should update a thematic', () => {
    const updatedThematic: ThematicModel = { id: 1, name: 'Updated Thematic', description: 'Updated Description', color: '#0000ff' };

    service.updatethematic(1,updatedThematic).subscribe(thematic => {
      expect(thematic).toEqual(updatedThematic);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.THEMATIC}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedThematic);
  });

  it('should delete a thematic', () => {
    const deletedThematic: ThematicModel = { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#ff0000' };

    service.deletethematic(1).subscribe(thematic => {
      expect(thematic).toEqual(deletedThematic);
    });

    const req = http.expectOne(`${environment.apiUrl}/${API.THEMATIC}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(deletedThematic);
  });
});
