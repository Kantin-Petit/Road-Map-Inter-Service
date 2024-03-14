import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilComponent } from './profil.component';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel, UserRole } from 'src/app/models/user-model';
import { of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['modifyUser']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [
        ProfilComponent,
      ],
      imports: [
        ToastModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AccordionModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;

    component.utilisateur = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: UserRole.USER,
      service_id: null,
      Service: { name: 'SomeService' }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize utilisateur with user from authService on ngOnInit', () => {
    const user: UserModel = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: UserRole.USER,
      service_id: null,
      Service: { name: 'SomeService' }
    };
    authService.getUser.and.returnValue(user);

    component.ngOnInit();

    expect(component.utilisateur).toEqual(user);
  });

  it('should set utilisateurDialog to true and reset submitted and newPassword in editUser', () => {
    component.editUser();

    expect(component.utilisateurDialog).toBe(true);
    expect(component.submitted).toBe(false);
    expect(component.newPassword).toEqual('');
  });


});
