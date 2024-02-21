import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { CommunicationComponent } from './communication.component';
import { SidebarModule } from 'primeng/sidebar';
import { FilterService } from 'src/app/services/filter.service';
import { TimelineModel } from 'src/app/models/timeline-model';

describe('CommunicationComponent', () => {
  let component: CommunicationComponent;
  let fixture: ComponentFixture<CommunicationComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarModule],
      declarations: [CommunicationComponent],
      providers: [FilterService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const service = 'test';
    const timelineData = new TimelineModel();
    timelineData.id = 123;

    component.toggleSidebar(service, timelineData);

    // expect(filterService.selectedItemIndex).toEqual(service + timelineData.id);
    // expect(filterService.sidebarData).toEqual(timelineData);
    // expect(filterService.sidebarVisible).toBeTruthy();
    
    component.toggleSidebar(service, timelineData);
    // expect(filterService.selectedItemIndex).toBeNull();
    // expect(filterService.sidebarVisible).toBeFalsy();
    // expect(filterService.sidebarData).toEqual(new TimelineModel());
  });
});
