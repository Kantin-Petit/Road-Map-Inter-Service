import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdeleteComponent } from './sdelete.component';

describe('SdeleteComponent', () => {
  let component: SdeleteComponent;
  let fixture: ComponentFixture<SdeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SdeleteComponent]
    });
    fixture = TestBed.createComponent(SdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
