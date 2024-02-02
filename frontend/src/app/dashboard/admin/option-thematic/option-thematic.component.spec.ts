import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionThematicComponent } from './option-thematic.component';

describe('OptionThematicComponent', () => {
  let component: OptionThematicComponent;
  let fixture: ComponentFixture<OptionThematicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionThematicComponent]
    });
    fixture = TestBed.createComponent(OptionThematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
