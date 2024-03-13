import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterComponent } from './../filter/filter.component';
import { MessageModule } from 'primeng/message';
import { ThematicService } from '../services/thematic.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole', 'getUser']);
    authServiceSpy.getRole.and.returnValue(of('admin'));
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, FilterComponent, SidemenuComponent],
      imports: [HttpClientTestingModule, DashboardRoutingModule, HttpClientTestingModule, HttpClientModule, ConfirmDialogModule, DialogModule, HttpClientModule, MessageModule, ToastModule, ToolbarModule, TableModule],
      providers: [
        ConfirmationService,
        ThematicService,
        MessageService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
