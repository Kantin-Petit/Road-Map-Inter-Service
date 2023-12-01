import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePlanningComponent } from './timeline-planning.component';

describe('TimelinePlanningComponent', () => {
  let component: TimelinePlanningComponent;
  let fixture: ComponentFixture<TimelinePlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelinePlanningComponent]
    });
    fixture = TestBed.createComponent(TimelinePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
