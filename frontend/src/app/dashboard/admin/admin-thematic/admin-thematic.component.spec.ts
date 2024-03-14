import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThematicComponent } from './admin-thematic.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ThematicService } from 'src/app/services/thematic.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThematicModel } from 'src/app/models/thematic-model';
import { of } from 'rxjs';

describe('AdminThematicComponent', () => {
  let component: AdminThematicComponent;
  let fixture: ComponentFixture<AdminThematicComponent>;
  let thematicServiceSpy: jasmine.SpyObj<ThematicService>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    thematicServiceSpy = jasmine.createSpyObj('ThematicService', ['getAllthematic']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [
        AdminThematicComponent,
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
        { provide: ThematicService, useValue: thematicServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminThematicComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch thematics on ngOnInit', () => {
    const thematics: ThematicModel[] = [
      { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#fff' },
      { id: 2, name: 'Thematic 2', description: 'Description 2', color: '#000' }
    ];
    thematicServiceSpy.getAllthematic.and.returnValue(of(thematics));

    component.ngOnInit();

    expect(component.thematics).toEqual(thematics);
  });

  it('should open new thematic dialog', () => {
    component.openNew();
    expect(component.createThematic).toBeTrue();
    expect(component.thematicDialog).toBeTrue();
    expect(component.thematic).toEqual(new ThematicModel());
    expect(component.submitted).toBeFalse();
  });

  it('should edit thematic', () => {
    const mockThematic: ThematicModel = { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#000' };
    component.editThematic(mockThematic);
    expect(component.thematic).toEqual(mockThematic);
    expect(component.thematicDialog).toBeTrue();
  });

  it('should hide dialog', () => {
    component.thematicDialog = true;
    component.createThematic = true;
    component.submitted = true;

    component.hideDialog();

    expect(component.thematicDialog).toBeFalse();
    expect(component.createThematic).toBeFalse();
    expect(component.submitted).toBeFalse();
  });

  it('should validate thematic', () => {
    component.thematic = new ThematicModel();
    expect(component.validThematic()).toBeFalse();

    component.thematic = { id: 1, name: 'Thematic 1', description: 'Description 1', color: '#000' };
    expect(component.validThematic()).toBeTrue();
  });
});
