import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserComponent } from './admin-user.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('AdminUserComponent', () => {
  let component: AdminUserComponent;
  let fixture: ComponentFixture<AdminUserComponent>;

  beforeEach(async () => {

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
      ],
      providers: [
        HttpClient,
        HttpHandler
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
});
