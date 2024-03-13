import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken', 'logout']);
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.getToken on ngOnInit and update hasToken', () => {
    const token = 'token';
    authService.getToken.and.returnValue(of(token));

    component.ngOnInit();

    expect(authService.getToken).toHaveBeenCalled();
    expect(component.hasToken).toEqual(token);
  });

  it('should call authService.logout on logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
