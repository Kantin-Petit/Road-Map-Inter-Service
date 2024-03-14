import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FilterComponent } from 'src/app/filter/filter.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CommunicationComponent } from 'src/app/timeline/communication/communication.component';
import { SidebarModule } from 'primeng/sidebar';

describe('TimelineComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        FilterComponent,
        CommunicationComponent,
      ],
      imports: [
        SidebarModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
