import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimelineComponent } from './admin-timeline.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThematicService } from 'src/app/services/thematic.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { of } from 'rxjs';
import { TimelineModel } from 'src/app/models/timeline-model';
import { ThematicModel } from 'src/app/models/thematic-model';
import { AuthService } from 'src/app/services/auth.service';

describe('AdminTimelineComponent', () => {
  let component: AdminTimelineComponent;
  let fixture: ComponentFixture<AdminTimelineComponent>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let thematicServiceSpy: jasmine.SpyObj<ThematicService>;
  let timelineServiceSpy: jasmine.SpyObj<TimelineService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    thematicServiceSpy = jasmine.createSpyObj('ThematicService', ['getAllthematic']);
    timelineServiceSpy = jasmine.createSpyObj('TimelineService', ['getListTimeline']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ 
        AdminTimelineComponent,
      ],
      imports: [
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceSpy},
        { provide: ConfirmationService, useValue: confirmationServiceSpy},
        { provide: TimelineService, useValue: timelineServiceSpy},
        { provide: ThematicService, useValue: thematicServiceSpy},
        { provide: AuthService, useValue: authServiceSpy },
        ConfirmationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimelineComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch timelines and thematics on ngOnInit', () => {
    const timelines: TimelineModel[] = [
      { id: 1, title: 'Timeline 1', text: 'Text 1', date_start: new Date(), date_end: new Date(), service_id: 1, Thematics: [] },
      { id: 2, title: 'Timeline 2', text: 'Text 2', date_start: new Date(), date_end: new Date(), service_id: 2, Thematics: [] }
    ];
    const thematics: ThematicModel[] = [
      { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#ffffff' },
      { id: 2, name: 'Thematic 2', description: 'Description 2', color: '#ffffff' }
    ];
    timelineServiceSpy.getListTimeline.and.returnValue(of(timelines));
    thematicServiceSpy.getAllthematic.and.returnValue(of(thematics));

    component.ngOnInit();

    expect(component.timelines).toEqual(timelines);
    expect(component.thematicList).toEqual(thematics);
  });

  it('should edit timeline and return image URL', () => {
    const timeline: TimelineModel = { id: 1, title: 'Timeline 1', text: 'Text 1', date_start: new Date(), date_end: new Date(), service_id: 1, Thematics: [], image: 'image.jpg' };
    component.timelineDialog = false;
    const originalService = 1;

    const imageUrl = component.editTimeline(timeline);

    expect(component.timeline).toEqual(timeline);
    expect(component.timelineDialog).toBe(true);
    expect(component.originalService).toBe(originalService);
    expect(imageUrl).toContain('image.jpg');
  });
});
