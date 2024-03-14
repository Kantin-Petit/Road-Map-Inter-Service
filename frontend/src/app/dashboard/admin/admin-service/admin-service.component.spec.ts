import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminServiceComponent } from './admin-service.component';
import { ServiceModel } from '../../../models/service-model';
import { of } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';

describe('AdminServiceComponent', () => {
  let component: AdminServiceComponent;
  let fixture: ComponentFixture<AdminServiceComponent>;
  let serviceServiceSpy: jasmine.SpyObj<ServiceService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['getAllService', 'deleteservice']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [AdminServiceComponent],
      imports: [
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ServiceService, useValue: serviceServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        MessageService,
        ConfirmationService,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServiceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch services on ngOnInit', () => {
    const services: ServiceModel[] = [
      { id: 1, name: 'Service 1', description: 'Description 1' },
      { id: 2, name: 'Service 2', description: 'Description 2' }
    ];
    serviceServiceSpy.getAllService.and.returnValue(of(services));

    fixture.detectChanges();
    expect(component.services).toEqual(services);
  });

  it('should open new service dialog', () => {
    component.openNew();
    expect(component.createService).toBeTrue();
    expect(component.serviceDialog).toBeTrue();
    expect(component.service).toEqual(new ServiceModel());
    expect(component.submitted).toBeFalse();
  });

  it('should reset image and file input on dialog hide', () => {
    component.imageUrl = 'test-image-url';
    component.imageFile = 'test-image-file';
    component.fileInput = { nativeElement: { value: 'test-value' } };

    component.onDialogHide();

    expect(component.imageUrl).toBeNull();
    expect(component.imageFile).toBeNull();
    expect(component.fileInput.nativeElement.value).toEqual('');
  });

  it('should edit service', () => {
    const mockService: ServiceModel = { id: 1, name: 'Service 1', description: 'Description 1' };
    component.editService(mockService);
    expect(component.service).toEqual(mockService);
    expect(component.serviceDialog).toBeTrue();
  });
});
