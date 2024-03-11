import { TestBed } from '@angular/core/testing';

import { TimelineService } from './timeline.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TimelineModel, TimelineModelWithService } from '../models/timeline-model';
import { API } from '../routes/api';

describe('TimelineService', () => {
  let service: TimelineService;
  let http: HttpTestingController;
  let apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimelineService]
    });
    service = TestBed.inject(TimelineService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return option thematic', () => {
    const optionThematic = 123;
    service.setOptionThematic(optionThematic);
    expect(service.getOptionThematic()).toEqual(optionThematic);
  });

  it('should get all services', () => {
    const dummyTimelines: TimelineModelWithService[] = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        image: 'image1.jpg',
        sujets: [
          {
            id: 1,
            title: 'Titre 1',
            text: 'Texte 1',
            image: 'image1.jpg',
            date_start: new Date('2024-01-01'),
            date_end: new Date('2024-01-15'),
            service_id: 1,
            Thematics: [
              { color: 'blue', name: 'Thematic 1', id: 1 },
              { color: 'red', name: 'Thematic 2', id: 2 }
            ]
          },
          {
            id: 2,
            title: 'Titre 2',
            text: 'Texte 2',
            image: 'image2.jpg',
            date_start: new Date('2024-02-01'),
            date_end: new Date('2024-02-15'),
            service_id: 1,
            Thematics: [
              { color: 'green', name: 'Thematic 3', id: 3 },
              { color: 'yellow', name: 'Thematic 4', id: 4 }
            ]
          }
        ]
      }
    ];

    service.getAllTimeline().subscribe(timelines => {
      expect(timelines.length).toBe(1);
      expect(timelines).toEqual(dummyTimelines);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTimelines);
  });

  it('should get filtered timelines', () => {
    const dummyData = { option: 1 };
    const dummyFilteredTimelines: TimelineModelWithService[] = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        image: 'image1.jpg',
        sujets: [
          {
            id: 1,
            title: 'Titre 1',
            text: 'Texte 1',
            image: 'image1.jpg',
            date_start: new Date('2024-01-01'),
            date_end: new Date('2024-01-15'),
            service_id: 1,
            Thematics: [
              { color: 'blue', name: 'Thematic 1', id: 1 },
              { color: 'red', name: 'Thematic 2', id: 2 }
            ]
          },
          {
            id: 2,
            title: 'Titre 2',
            text: 'Texte 2',
            image: 'image2.jpg',
            date_start: new Date('2024-02-01'),
            date_end: new Date('2024-02-15'),
            service_id: 1,
            Thematics: [
              { color: 'green', name: 'Thematic 3', id: 3 },
              { color: 'yellow', name: 'Thematic 4', id: 4 }
            ]
          }
        ]
      }
    ];

    service.getFilteredTimeline(dummyData).subscribe(timelines => {
      expect(timelines.length).toBe(1);
      expect(timelines).toEqual(dummyFilteredTimelines);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE_FILTERED}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyFilteredTimelines);
  });

  it('should get list of timelines', () => {
    const dummyTimelineList: TimelineModel[] = [
      {
        id: 1,
        title: 'Titre de la barre latérale',
        text: 'Texte de la barre latérale',
        image: 'image.jpg',
        date_start: new Date(),
        date_end: new Date(),
        service_id: 1,
        Thematics: [
          { id: 1, color: 'red', name: 'Thématique 1' },
          { id: 2, color: 'green', name: 'Thématique 2' },
          { id: 3, color: 'blue', name: 'Thématique 3' }
        ]
      }
    ];

    service.getListTimeline().subscribe(timelines => {
      expect(timelines.length).toBe(1);
      expect(timelines).toEqual(dummyTimelineList);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE_LIST}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTimelineList);
  });

  it('should create timeline', () => {
    const dummyData = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la barre latérale',
      image: 'image.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };
    const dummyCreatedTimeline: TimelineModel = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la barre latérale',
      image: 'image.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };

    service.createTimeline(dummyData).subscribe(timeline => {
      expect(timeline).toEqual(dummyCreatedTimeline);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyCreatedTimeline);
  });

  it('should update timeline', () => {
    const dummyId = 1;
    const dummyData = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la barre latérale',
      image: 'image.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };
    const dummyUpdatedTimeline: TimelineModel = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la',
      image: 'ima51ge.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };

    service.updateTimeline(dummyId, dummyData).subscribe(timeline => {
      expect(timeline).toEqual(dummyUpdatedTimeline);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE}/${dummyId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyUpdatedTimeline);
  });

  it('should delete timeline', () => {
    const dummyId = 1;
    const dummyDeletedTimeline: TimelineModel = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la barre latérale',
      image: 'image.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };

    service.deleteTimeline(dummyId).subscribe(timeline => {
      expect(timeline).toEqual(dummyDeletedTimeline);
    });

    const req = http.expectOne(`${apiUrl}/${API.TIMELINE}/${dummyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyDeletedTimeline);
  });
});
