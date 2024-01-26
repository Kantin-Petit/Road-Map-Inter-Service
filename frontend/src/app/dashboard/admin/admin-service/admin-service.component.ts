import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { ServiceModel } from '../../../models/service-model';
import { TimelineModel, TimelineModelWithService } from '../../../models/timeline-model';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss']
})
export class AdminServiceComponent implements OnInit {

  services!: ServiceModel[];
  selectedService!: string;
  selectedServiceDetails!: ServiceModel;
  selectedTimelineId: number | null = null;
  selectedTimeline: any = null;
  timelineSearchTerm: string = '';
  filteredTimelines: any[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
      this.getService();
  }

 getService() {
    this.serviceService.getAllService().subscribe(service => {
        this.services = service;
    });
  }

  onServiceChange() {
    this.selectedServiceDetails = new ServiceModel();
    this.selectedTimelineId = null;
    this.selectedTimeline = null;

    // this.serviceService.getService(this.selectedService, null).subscribe(service => {
    //   this.selectedServiceDetails = service[this.selectedService];
    //   this.filterTimelines();
    // });
  }
    
    createService() { 

    }
    
    deleteService(id: number) { 

    }

    editService(id: number) { 

    }

  filterTimelines() {
    // if (this.selectedServiceDetails && this.selectedServiceDetails.sujets) {
    //   this.filteredTimelines = this.selectedServiceDetails.timelines.filter((timeline: { titre: string }) =>
    //     timeline.titre.toLowerCase().includes(this.timelineSearchTerm.toLowerCase())
    //   );

    //   if (this.filteredTimelines.length === 1) {
    //     this.selectedTimelineId = this.filteredTimelines[0].id;
    //     this.onTimelineChange();
    //   }
    // }

  }

  onTimelineChange() {
    // if (this.selectedServiceDetails && this.selectedServiceDetails.timelines) {
    //   this.selectedTimeline = this.selectedServiceDetails.timelines.find((timeline: { id: number | null; }) => timeline.id === Number(this.selectedTimelineId));
    // }
  }

}
