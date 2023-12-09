import { Component } from '@angular/core';

interface EventItem {
    name?: string;
    date: Date;
    desc?: string;
    color?: string;
    image?: string;
}

@Component({
  selector: 'app-timeline-communication',
  templateUrl: './timeline-communication.component.html',
  styleUrls: ['./timeline-communication.component.scss']
})
export class TimelineCommunicationComponent {
[x: string]: any;

  events: EventItem[];

    constructor() {
        this.events = [
            { name: 'Ordered', date: new Date(2020,2,15), desc: "dtuvifbyesfsqeseffsdfs", color: '#9C27B0', image: 'game-controller.jpg' },
            { name: 'Processing', date: new Date(2020,1,15), desc: "dtuvifbyesfsqeseffsdfs", color: '#673AB7' },
            { name: 'Shipped', date: new Date(2020,6,15), desc: "dtuvifbyesfsqeseffsdfs", color: '#FF9800' },
            { name: 'Delivered', date: new Date(2020,11,15), desc: "dtuvifbyesfsqeseffsdfsdtuvifbyesfsqe seffsdfsdt uvifbyesfs qeseffsdfsdtuvi fbyesfsqe seffsdfs", color: '#607D8B' },
            { name: 'Processing', date: new Date(2020,1,15), desc: "dtuvifbyesfsqeseffsdfs", color: '#673AB7' },
            { name: 'Shipped', date: new Date(2020,6,15), desc: "dtuvifbyesfsqeseffsdfs", color: '#FF9800' },
            { name: 'Delivered', date: new Date(2020,11,15), desc: "dtuvifbyesfsqeseffsdfsdtuvifbyesfsqe seffsdfsdt uvifbyesfs qeseffsdfsdtuvi fbyesfsqe seffsdfs", color: '#607D8B' }
        ];
        
        this.events.sort((a, b) => a.date.getTime() - b.date.getTime());

        

         

        

    }
    
    getCardBackground(event: EventItem){
      return{
        'backgroundColor': event.color || 'transparent'
      };
    }
}
