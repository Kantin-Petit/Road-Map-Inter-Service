import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ToastModule } from 'primeng/toast';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['resetNewPassword']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ReactiveFormsModule, ToastModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message for invalid password format', () => {
    component.resetForm.setValue({ password: 'invalidPassword', confirmPassword: 'invalidPassword' });
    component.onSubmit();
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erreur', detail: 'Le mot de passe exige au moins 8 caractères et doit comporter au moins : 1 chiffre, 1 lettre majuscule, 1 lettre minuscule et un caractère special', life: 3000 });
    expect(authService.resetNewPassword).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should show error message for mismatched passwords', () => {
    component.resetForm.setValue({ password: 'newPassword-123', confirmPassword: 'differentPassword-123' });
    component.onSubmit();
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erreur', detail: 'Les mots de passe ne correspondent pas', life: 3000 });
    expect(authService.resetNewPassword).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

});
