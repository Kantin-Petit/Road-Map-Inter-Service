import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditComponent } from './uedit.component';

describe('UeditComponent', () => {
  let component: UeditComponent;
  let fixture: ComponentFixture<UeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UeditComponent]
    });
    fixture = TestBed.createComponent(UeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
