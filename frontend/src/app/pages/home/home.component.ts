import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public filterService: FilterService) { }

  ngOnInit() {

  }

  displayCommunication: boolean = true;
  displayPlanning: boolean = false;

  showTimeLine(timeline: string) {
    this.displayPlanning = false;
    this.displayCommunication = false;

    if(timeline === 'planning') {
      this.displayPlanning = true;
    }
    if(timeline === 'communication') {
      this.displayCommunication = true;
    }
  }

}
