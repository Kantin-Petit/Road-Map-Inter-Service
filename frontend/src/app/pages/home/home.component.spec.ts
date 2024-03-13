import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FilterComponent } from 'src/app/filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThematicService } from 'src/app/services/thematic.service';
import { TimelineService } from 'src/app/services/timeline.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { CommunicationComponent } from 'src/app/timeline/communication/communication.component';
import { PlanningComponent } from 'src/app/timeline/planning/planning.component';
import { SidebarModule } from 'primeng/sidebar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FilterComponent, CommunicationComponent, PlanningComponent],
      imports: [HttpClientTestingModule, SidebarModule],
      providers: [FilterService, ThematicService, TimelineService, AuthService, MessageService]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

});
