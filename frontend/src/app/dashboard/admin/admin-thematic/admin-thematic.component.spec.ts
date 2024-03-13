import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThematicComponent } from './admin-thematic.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('AdminThematicComponent', () => {
  let component: AdminThematicComponent;
  let fixture: ComponentFixture<AdminThematicComponent>;

  beforeEach(async () => {

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
      ],
      providers: [
        HttpClient,
        HttpHandler,
        MessageService,
        ConfirmationService
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
});
