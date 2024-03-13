import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidemenuComponent } from './sidemenu.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole', 'getUser']);
    authServiceSpy.getRole.and.returnValue(of('admin'));
    authServiceSpy.getUser.and.returnValue(of({ role: 'admin' }));

    await TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, HttpClientModule, ConfirmDialogModule, DialogModule, HttpClientModule, MessageModule, ToastModule, ToolbarModule, TableModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
