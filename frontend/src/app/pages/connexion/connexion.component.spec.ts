import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ConnexionComponent } from './connexion.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserRole } from 'src/app/models/user-model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setToken', 'setUser']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getOneUser']);

    await TestBed.configureTestingModule({
      declarations: [ConnexionComponent],
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule,
        ToastModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        MessageService
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method of AuthService and navigate to dashboard on successful login', () => {
    const fakeFormData = { email: 'test@test.com', password: 'password' };
    const fakeResponse = { id: 1, accessToken: 'fakeToken' };
    const fakeUserData = { 
      id: 1,
      email: 'test1@example.com',
      first_name: 'User',
      last_name: 'One',
      password: 'password1',
      role: UserRole.ADMIN,
      service_id: 1,
      Service: { name: 'Service One' }
    };

    component.loginForm.setValue(fakeFormData);
    authService.login.and.returnValue(of(fakeResponse));
    userService.getOneUser.and.returnValue(of(fakeUserData));

    spyOn(component.getRouter(), 'navigate');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(fakeFormData);
    expect(userService.getOneUser).toHaveBeenCalledWith(fakeResponse.id);
    expect(authService.setToken).toHaveBeenCalledWith(fakeResponse.accessToken);
    expect(authService.setUser).toHaveBeenCalledWith(fakeUserData);
  });

  it('should not call login method of AuthService if form is invalid', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: '' });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });
});