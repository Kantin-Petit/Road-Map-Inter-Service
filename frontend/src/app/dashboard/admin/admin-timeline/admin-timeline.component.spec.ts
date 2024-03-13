import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimelineComponent } from './admin-timeline.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('AdminTimelineComponent', () => {
  let component: AdminTimelineComponent;
  let fixture: ComponentFixture<AdminTimelineComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ 
        AdminTimelineComponent,
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
    fixture = TestBed.createComponent(AdminTimelineComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
