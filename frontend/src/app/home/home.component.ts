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

    if(timeline === 'communication') {
      this.displayCommunication = true;
      this.displayPlanning = false;
    }
    if(timeline === 'planning') {
      this.displayCommunication = false;
      this.displayPlanning = true;
    }
  }

}
