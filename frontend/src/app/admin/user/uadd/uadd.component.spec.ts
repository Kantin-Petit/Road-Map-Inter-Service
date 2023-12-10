import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UaddComponent } from './uadd.component';

describe('UaddComponent', () => {
  let component: UaddComponent;
  let fixture: ComponentFixture<UaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UaddComponent]
    });
    fixture = TestBed.createComponent(UaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
