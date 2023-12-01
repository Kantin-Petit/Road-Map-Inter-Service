import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCommunicationComponent } from './timeline-communication.component';

describe('TimelineCommunicationComponent', () => {
  let component: TimelineCommunicationComponent;
  let fixture: ComponentFixture<TimelineCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineCommunicationComponent]
    });
    fixture = TestBed.createComponent(TimelineCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
