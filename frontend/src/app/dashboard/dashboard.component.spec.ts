import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach( async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole']);
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent,SidemenuComponent],
      imports: [RouterTestingModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
