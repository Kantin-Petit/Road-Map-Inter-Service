import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterComponent } from './filter.component';
import { ServiceService } from '../services/service.service';
import { ThematicService } from '../services/thematic.service';
import { FilterService } from '../services/filter.service';
import { TimelineService } from '../services/timeline.service';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TimelineModelWithService } from '../models/timeline-model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockServiceService: jasmine.SpyObj<ServiceService>;
  let mockThematicService: jasmine.SpyObj<ThematicService>;
  let mockFilterService: jasmine.SpyObj<FilterService>;
  let mockTimelineService: jasmine.SpyObj<TimelineService>;

  beforeEach(async () => {
    mockServiceService = jasmine.createSpyObj('ServiceService', ['getAllTimeline']);
    mockThematicService = jasmine.createSpyObj('ThematicService', ['getAllthematic']);
    mockFilterService = jasmine.createSpyObj('FilterService', ['resetVariables', 'setServicesFilter']);
    mockTimelineService = jasmine.createSpyObj('TimelineService', ['getFilteredTimeline', 'getAllTimeline']);

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ThematicService, useValue: mockThematicService },
        { provide: FilterService, useValue: mockFilterService },
        { provide: TimelineService, useValue: mockTimelineService },
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setServices and setThematics on initialization', () => {
    spyOn(component, 'setServices');
    spyOn(component, 'setThematics');

    component.ngOnInit();

    expect(component.setServices).toHaveBeenCalled();
    expect(component.setThematics).toHaveBeenCalled();
  });


  it('should set services and filter services when setServices is called', () => {
    const mockTimelineData: TimelineModelWithService[] = [
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

    mockTimelineService.getAllTimeline.and.returnValue(of(mockTimelineData));

    component.setServices();

    expect(mockFilterService.services).toEqual(mockTimelineData);
    expect(mockFilterService.servicesFilter).toEqual(mockTimelineData);
    expect(mockFilterService.setServicesFilter).toHaveBeenCalledWith(true);
  });

});
