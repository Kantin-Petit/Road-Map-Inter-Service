import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanningComponent } from './planning.component';
import { FilterService } from 'src/app/services/filter.service';
import { SidebarModule } from 'primeng/sidebar';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SidebarModule ],
      declarations: [PlanningComponent],
      providers: [ FilterService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize timeline and options after view initialization', () => {
    spyOn(component, 'addDataIntoDom');
    spyOn(component, 'getOptions');
    component.ngAfterViewInit();
    expect(component.timeline).toBeDefined();
    expect(component.options).toBeDefined();
    //Cannot read properties of undefined (reading 'services')
    expect(filterService.services).toBeDefined();
    expect(component.addDataIntoDom).toHaveBeenCalled();
    expect(component.getOptions).toHaveBeenCalled();
  });

  it('should toggle sidebar', () => {
    const fakeElt = { data: { content: {
      "id": 9,
      "title": "Timeline9",
      "text": "Texte de la timeline 9",
      "image": "image9.jpg",
      "date_start": new Date(2023-11-6),
      "date_end": new Date(2024-2-10),
      "serviceId": 3,
      "Thematics": [
          {
              "name": "Thematic4",
              "id": 4,
              "color": "#FFA500"
          }
      ]
  } }, id: 'fakeId' };
    component.toggleSidebar(fakeElt);
    //Cannot read properties of undefined (reading 'sidebarData')
    expect(filterService.sidebarData).toEqual({
      "id": 9,
      "title": "Timeline9",
      "text": "Texte de la timeline 9",
      "image": "image9.jpg",
      "date_start": new Date(2023-11-6),
      "date_end": new Date(2024-2-10),
      "serviceId": 3,
      "Thematics": [
          {
              "name": "Thematic4",
              "id": 4,
              "color": "#FFA500"
          }
      ]
  });
    expect(filterService.sidebarVisible).toBeTrue();
    expect(filterService.selectTimeline).toEqual('fakeId');
  });

  it('should toggle active', () => {
    const timelineElement = document.createElement('div');
    timelineElement.classList.add('fakeId');
    spyOn(document, 'querySelector').and.returnValue(timelineElement);
    component.toogleActive();
    expect(timelineElement.classList.contains('active')).toBeTrue();
  });

  it('should update timeline', () => {
    spyOn(component, 'updateTimeline');
    const fakeEvent = new MouseEvent('click');
    const fakeTarget: any = { tagName: 'input', type: 'checkbox' };
    spyOnProperty(fakeEvent, 'target').and.returnValue(fakeTarget);
    component.onDocumentClick(fakeEvent);
    expect(component.updateTimeline).toHaveBeenCalled();
  });
});
