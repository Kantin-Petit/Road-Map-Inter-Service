import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FilterService } from '../../services/filter.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from 'src/app/filter/filter.component';
import { CommunicationComponent } from 'src/app/timeline/communication/communication.component';
import { PlanningComponent } from 'src/app/timeline/planning/planning.component';
import { Sidebar } from 'primeng/sidebar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent, 
        FilterComponent,
        CommunicationComponent,
        PlanningComponent,
        Sidebar
      ],
      imports: [HttpClientModule],
      providers: [ FilterService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayCommunication to true and displayPlanning to false', () => {
    expect(component.displayCommunication).toBe(true);
    expect(component.displayPlanning).toBe(false);
  });

  it('should set displayCommunication to true when showTimeLine("communication") is called', () => {
    component.showTimeLine('communication');
    expect(component.displayCommunication).toBe(true);
    expect(component.displayPlanning).toBe(false);
  });

  it('should set displayPlanning to true when showTimeLine("planning") is called', () => {
    component.showTimeLine('planning');
    expect(component.displayPlanning).toBe(true);
    expect(component.displayCommunication).toBe(false);
  });

  it('should set both displayCommunication and displayPlanning to false when showTimeLine is called with a different argument', () => {
    component.showTimeLine('somethingElse');
    expect(component.displayPlanning).toBe(false);
    expect(component.displayCommunication).toBe(false);
  });

});
