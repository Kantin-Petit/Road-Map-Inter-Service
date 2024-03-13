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

describe('AdminServiceComponent', () => {
  let component: AdminServiceComponent;
  let fixture: ComponentFixture<AdminServiceComponent>;
  let serviceServiceSpy: jasmine.SpyObj<ServiceService>;

  beforeEach(async () => {
    serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['getAllService']);

    await TestBed.configureTestingModule({
      declarations: [ AdminServiceComponent ],
      imports: [
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
      ],
      providers: [
        { provide: ServiceService, useValue: serviceServiceSpy },
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
});
