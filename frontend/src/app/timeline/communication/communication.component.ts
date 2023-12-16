import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

interface EventItem {
  titre?: string;
  dateStart: Date;
  dateEnd: Date;
  texte?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent {
  departments: any[] = [];
  sidebarVisible: boolean[];
  events: EventItem[];

  

    constructor(private serviceService: ServiceService) {
        this.events = [
          {
            titre: "Titre de l'article 1",
            texte: "Ceci est le contenu de l'article 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2016,1,1),
            dateEnd: new Date(2016,1,2),
            color: '#673AB7'
          },
          {
            titre: "Titre de l'article 2",
            texte: "Ceci est le contenu de l'article 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2015,1,1),
            dateEnd: new Date(2016,1,2),
            color: '#3A67B7'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          },
          {
            titre: "Titre de l'article 3",
            texte: "Ceci est le contenu de l'article 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dapibus libero. Nullam nec augue ac purus aliquam accumsan. Integer quis ante vitae dui faucibus ullamcorper. Ut fermentum mi vitae metus tristique fermentum.",
            image: "http://placehold.it/350x150",
            dateStart: new Date(2019,1,1),
            dateEnd: new Date(2011,1,2),
            color: '#67B73A'
          }
        ];
        
        this.sidebarVisible = [];
        for(let i = 0; i < this.events.length; i++){
          this.sidebarVisible.push(false);
        }
        
        this.events.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());
    }
    

    ngOnInit(){
      this.serviceService.getAllService().subscribe(
        (data: any) => {
          this.departments = data;
          console.log(this.departments);
          for (let i = 0; i < this.departments.length; i++) {
        
            this.serviceService.getService(this.departments[i].id).subscribe(
              (data: any) => {
                this.departments[i].services = data;
                console.log(this.departments[i].services)
              },
              (error: any) => {
                console.error(error); 
              }
            );
          }
        },
        (error: any) => {
          console.error(error); 
        }
      );
      
    }

    getTextColor(event: EventItem){
      return{
        'color': event.color || 'black'
      };
    }

    getMarkerBackground(event: EventItem){
      return{
        'backgroundColor': event.color || 'transparent'
      };
    }
}
