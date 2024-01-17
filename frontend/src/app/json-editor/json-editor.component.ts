import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { ServiceModel, TimelineModel } from '../models/service-model';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {

  filteredData!: ServiceModel;
  services: { [key: string]: ServiceModel } = {};
  selectedService: ServiceModel | null = null;
  isNewService: boolean = false;

  constructor(private serviceService: ServiceService) {}

  selectedOption: any; 
  options!: any[];

  ngOnInit(): void {
    this.setServices();
  }


  setServices() {
    this.serviceService.getListService().subscribe(service => {
      this.options = service;
      // console.log(service)
    });
  }





  
}
