import { Component, OnInit } from '@angular/core';
import { Observable, of, toArray } from 'rxjs';
import { Department } from 'src/app/models/department-model';
import { Service } from 'src/app/models/service-model';
import { ServiceService } from 'src/app/services/service.service';

interface All{
  dep: String;
  services$: Service[];
}

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit{
  departments: Department[] = [ {id: 0,name: 'ateliers'}];
  sidebarVisible: boolean[][];
  GlobalArray: All[] = [
    {dep: 'a', services$: [
      {
        "titre": "Titre de l'article 1",
        "texte": "Ceci est le contenu de l'article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
        "image": "http://placehold.it/350x150",
        "dateStart": new Date(2016,1,1),
        "dateEnd": new Date(2016,1,2)
      },
      {
        "titre": "Titre de l'article 1",
        "texte": "Ceci est le contenu de l'article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
        "image": "http://placehold.it/350x150",
        "dateStart": new Date(2016,1,1),
        "dateEnd": new Date(2016,1,2)
      },
      {
        "titre": "Titre de l'article 1",
        "texte": "Ceci est le contenu de l'article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
        "image": "http://placehold.it/350x150",
        "dateStart": new Date(2016,1,1),
        "dateEnd": new Date(2016,1,2)
}]}
  ];

    constructor(private serviceService: ServiceService) {
        for(let i = 0; i < this.GlobalArray.length; i++){
          this.GlobalArray[i].services$.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
        }

        this.sidebarVisible = [];
        for(let i = 0; i < this.GlobalArray.length; i++){
          this.sidebarVisible.push([]);
          for(let j = 0; j < this.GlobalArray[i].services$.length-1; j++){
            this.sidebarVisible[i].push(false);
          }
        }
    }
    
    sortArray(array: Service[]){
      array.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
    }
    generateSidebarVisible(array: Service[]){
      this.sidebarVisible.push([]);
      for(let j = 0; j < array.length-1; j++){
        this.sidebarVisible[j].push(false);
      }
    }

    ngOnInit(){}

    getTextColor(event: Service){
      return{
        'color': event.color || 'black'
      };
    }

    getMarkerBackground(event: Service){
      return{
        'backgroundColor': event.color || 'transparent'
      };
    }
}
