import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { TimelineModel } from '../models/timeline-model';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent]
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
      serviceId: 1,
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

  it('should display data', () => {
    const sidebarData: TimelineModel = {
      id: 1,
      title: 'Titre de la barre latérale',
      text: 'Texte de la barre latérale',
      image: 'https://placehold.co/400',
      date_start: new Date(),
      date_end: new Date(),
      serviceId: 1,
      Thematics: [
        { id: 1, color: 'red', name: 'Thématique 1' },
        { id: 2, color: 'green', name: 'Thématique 2' },
        { id: 3, color: 'blue', name: 'Thématique 3' }
      ]
    };

    component.sidebarData = sidebarData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(sidebarData.title);
    expect(compiled.querySelector('p').textContent).toContain(sidebarData.text);
    var puceElements = compiled.querySelectorAll('.puce')
    expect(puceElements.length).toEqual(sidebarData.Thematics.length);
    if (puceElements.length > 0) {
      expect(puceElements[0].style.backgroundColor).toEqual('red');
    }
  });
});
