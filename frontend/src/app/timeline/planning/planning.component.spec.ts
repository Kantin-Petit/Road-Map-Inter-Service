import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PlanningComponent } from './planning.component';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, Subject } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let filterServiceMock: Partial<FilterService>;

  beforeEach(() => {
    filterServiceMock = {
      services: [
      ],
      getFilterChangeObservable(): Observable<void> {
        return new Subject<void>();
      }
    };

    TestBed.configureTestingModule({
      declarations: [PlanningComponent],
      imports: [SidebarModule],
      providers: [{ provide: FilterService, useValue: filterServiceMock }]
    });

    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update timeline', () => {
    component.ngOnInit();
    const originalDataLength = component.data.length;
    const originalGroupsLength = component.groups.length;

    component.updateTimeline();

    expect(component.data.length).toBe(originalDataLength);
    expect(component.groups.length).toBe(originalGroupsLength);
  });

  it('should toggle sidebar', () => {
    const content = { data: { content: { id: 1, title: 'Title', text: 'some text', date_start: new Date('2020/01/01'), date_end: new Date('2020/02/02'), service_id: 1, Thematics: [{ id: 1, name: 'Thematic 1', color: 'someColor' }] } }, id: 'test_id', };
    component.toggleSidebar(content);
    const filterService = TestBed.inject(FilterService);
    expect(filterService.sidebarVisible).toBe(true);
    expect(filterService.sidebarData).toEqual(content.data.content);
    expect(filterService.selectTimeline).toBe(content.id);
  });

  it('should toggle active class', () => {
    const element = document.createElement('div');
    element.classList.add('test_id');
    document.body.appendChild(element);
    component.filterService.selectTimeline = 'test_id';
    component.toogleActive();
    expect(element.classList.contains('active')).toBe(true);
  });
});
