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
      image: 'image.jpg',
      date_start: new Date(),
      date_end: new Date(),
      service_id: 1,
      //Cannot read properties of undefined (reading 'Thematics')
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
    expect(compiled.querySelector('p').textContent).toContain(sidebarData.image);
    //expect(compiled.querySelector('img').src).toContain(sidebarData.image);
    expect(compiled.querySelector('.puce').length).toEqual(sidebarData.Thematics.length);
    expect(compiled.querySelector('.puce')[0].style.backgroundColor).toEqual('red');
  });
});
