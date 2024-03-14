import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserComponent } from './admin-user.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from 'src/app/services/user.service';
import { ServiceService } from 'src/app/services/service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserModel } from 'src/app/models/user-model';

describe('AdminUserComponent', () => {
  let component: AdminUserComponent;
  let fixture: ComponentFixture<AdminUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let serviceServiceSpy: jasmine.SpyObj<ServiceService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let messageService: MessageService;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUser', 'deleteUser', 'modifyUser', 'register']);
    serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['getAllService']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser', 'register']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [ 
        AdminUserComponent,
      ],
      imports: [
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ServiceService, useValue: serviceServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MessageService, useClass: MessageService },
        { provide: ConfirmationService, useValue: confirmationServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open new user dialog', () => {
    component.openNew();
    expect(component.createUser).toBe(true);
    expect(component.utilisateur).toEqual(new UserModel());
    expect(component.submitted).toBe(false);
    expect(component.utilisateurDialog).toBe(true);
  });

  it('should hide user dialog', () => {
    component.hideDialog();
    expect(component.utilisateurDialog).toBe(false);
    expect(component.createUser).toBe(false);
    expect(component.submitted).toBe(false);
  });  

});
