import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdeleteComponent } from './udelete.component';

describe('UdeleteComponent', () => {
  let component: UdeleteComponent;
  let fixture: ComponentFixture<UdeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UdeleteComponent]
    });
    fixture = TestBed.createComponent(UdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
