import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SindexComponent } from './sindex.component';

describe('SindexComponent', () => {
  let component: SindexComponent;
  let fixture: ComponentFixture<SindexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SindexComponent]
    });
    fixture = TestBed.createComponent(SindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
