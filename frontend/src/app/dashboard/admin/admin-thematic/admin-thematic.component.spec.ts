import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThematicComponent } from './admin-thematic.component';

describe('AdminThematicComponent', () => {
  let component: AdminThematicComponent;
  let fixture: ComponentFixture<AdminThematicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminThematicComponent]
    });
    fixture = TestBed.createComponent(AdminThematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
