import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanningComponent } from './planning.component';
import { FilterService } from 'src/app/services/filter.service';
import { SidebarModule } from 'primeng/sidebar';

import { Sidebar } from 'primeng/sidebar';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarModule],
      declarations: [
        PlanningComponent, 
        Sidebar
      ],
      providers: [
        FilterService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    filterService.services = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        sujets: [
        ]
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const fakeElt = {
      data: {
        content: {
          "id": 9,
          "title": "Timeline9",
          "text": "Texte de la timeline 9",
          "image": "image9.jpg",
          "date_start": new Date(2023 - 11 - 6),
          "date_end": new Date(2024 - 2 - 10),
          "service_id": 3,
          "Thematics": [
            {
              "name": "Thematic4",
              "id": 4,
              "color": "#FFA500"
            }
          ]
        }
      }, id: 'fakeId'
    };
    component.toggleSidebar(fakeElt);
    //Cannot read properties of undefined (reading 'sidebarData')
    expect(filterService.sidebarData).toEqual({
      "id": 9,
      "title": "Timeline9",
      "text": "Texte de la timeline 9",
      "image": "image9.jpg",
      "date_start": new Date(2023 - 11 - 6),
      "date_end": new Date(2024 - 2 - 10),
      "service_id": 3,
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
