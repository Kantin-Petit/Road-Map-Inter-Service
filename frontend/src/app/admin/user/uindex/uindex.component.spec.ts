import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UindexComponent } from './uindex.component';

describe('UindexComponent', () => {
  let component: UindexComponent;
  let fixture: ComponentFixture<UindexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UindexComponent]
    });
    fixture = TestBed.createComponent(UindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
