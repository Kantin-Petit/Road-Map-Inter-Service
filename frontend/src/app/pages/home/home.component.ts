import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  displayCommunication: boolean = true;
  displayPlanning: boolean = false;


  showTimeLine(timeline: string) {
    this.displayPlanning = false;
    this.displayCommunication = false;
    this.displayCommunication = false;

    if(timeline === 'planning') {
      this.displayPlanning = true;
    }
    if(timeline === 'communication') {
      this.displayCommunication = true;
    }
  }

}
