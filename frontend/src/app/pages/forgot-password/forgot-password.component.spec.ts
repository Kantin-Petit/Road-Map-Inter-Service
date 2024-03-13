import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { ToastModule } from 'primeng/toast';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['resetPassword']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule, ToastModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset password successfully', () => {
    authService.resetPassword.and.returnValue(of({}));
    component.forgotForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(authService.resetPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Successful', detail: 'Mot de passe envoyé. Veuillez vérifier votre boîte mail.', life: 3500 });
  });

  it('should handle error with status code 429', () => {
    const errorResponse = { status: 429 };
    authService.resetPassword.and.returnValue(throwError(errorResponse));
    component.forgotForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(authService.resetPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erreur', detail: 'Trop de tentatives de connexion. Veuillez réessayer plus tard.' });
  });

  it('should handle other errors', () => {
    const errorResponse = { status: 500 };
    authService.resetPassword.and.returnValue(throwError(errorResponse));
    component.forgotForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(authService.resetPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue, veuillez réessayer plus tard.' });
  });

  it('should show error message for invalid form', () => {
    component.onSubmit();
    expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir correctement le formulaire.' });
    expect(authService.resetPassword).not.toHaveBeenCalled();
  });

});
