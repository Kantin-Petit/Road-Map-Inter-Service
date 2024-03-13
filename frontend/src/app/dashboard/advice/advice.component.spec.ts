import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceComponent } from './advice.component';

describe('AdviceComponent', () => {
  let component: AdviceComponent;
  let fixture: ComponentFixture<AdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
