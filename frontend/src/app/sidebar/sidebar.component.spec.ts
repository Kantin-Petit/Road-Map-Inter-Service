import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { TimelineModel } from '../models/timeline-model';
import { MarkdownModule } from 'ngx-markdown';
import { Component } from '@angular/core';

@Component({ selector: 'app-puce', template: '' })
class MockPuceComponent { }

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent, MockPuceComponent],
      imports: [MarkdownModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    component.sidebarData = {
      id: 1,
      title: 'Test Title',
      text: 'Test Text',
      image: 'Test Image URL',
      date_start: new Date('2024-01-01'),
      date_end: new Date('2024-02-01'),
      service_id: 1,
      Thematics: [
        { color: '#ff0000', name: 'Theme 1', id: 1 },
        { color: '#00ff00', name: 'Theme 2', id: 2 },
        { color: '#0000ff', name: 'Theme 3', id: 3 }
      ]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the image URL', () => {
    expect(component.getImageUrl(component.sidebarData)).toBe('http://localhost:3000/images/services/service1/timeline1/Test Image URL');
  });

});
