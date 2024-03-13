import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterComponent } from './../../filter/filter.component';
import { MessageModule } from 'primeng/message';
import { ThematicService } from '../../services/thematic.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { ProfilComponent } from './profil.component';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole', 'getUser']);
    authServiceSpy.getRole.and.returnValue(of('admin'));
    authServiceSpy.getUser.and.returnValue(of({ role: 'admin' }));

    await TestBed.configureTestingModule({
      declarations: [ProfilComponent, FilterComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, DialogModule, HttpClientModule, MessageModule, ToastModule, ToolbarModule, TableModule],
      providers: [
        ConfirmationService,
        ThematicService,
        MessageService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
