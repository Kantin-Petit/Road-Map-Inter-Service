import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { Thematic } from '../../../models/thematic-model';
import { AuthService } from '../../../services/auth.service';
import { ThematicService } from '../../../services/thematic.service';
import { of, map } from 'rxjs';

@Component({
  selector: 'app-admin-thematic',
  templateUrl: './admin-thematic.component.html',
  styleUrls: ['./admin-thematic.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminThematicComponent implements OnInit {


  @ViewChild('dt') dt!: Table;

  thematics!: Thematic[];
  thematic!: Thematic
  thematicDialog: boolean = false;
  selectedThematics!: Thematic[] | null;
  submitted: boolean = false;
  Delete!: string;
  service!: Thematic[];
  createThematic: boolean = false
 

  constructor(
    private thematicService: ThematicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.thematicService.getAllthematic().subscribe(response => {
      this.thematics = response;
    });
  }

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, 'contains');
  }

  openNew() {
    this.createThematic = true;
    this.thematic = new Thematic();
    this.submitted = false;
    this.thematicDialog = true;
  }

  onDialogHide() {
    if (!this.thematicDialog) this.createThematic = false;
  }

  deleteSelectedThematics() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        if (!this.selectedThematics) return
        this.selectedThematics.forEach(thematic => {
          this.thematicService.deletethematic(thematic['id']).subscribe();
        });

        this.thematics = this.thematics.filter((val) => !this.selectedThematics?.includes(val));
        this.selectedThematics = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Thematique Supprimer', life: 3000 });

      }
    });
  }

  editThematic(thematic: Thematic) {
    this.thematic = { ...thematic };
    this.thematicDialog = true;
  }

  deleteThematic(thematic: Thematic) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + thematic.name + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.thematicService.deletethematic(thematic['id']).subscribe(() => {
          this.thematics = this.thematics.filter((val) => val.id !== thematic['id']);
          this.thematic = new Thematic();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Thématique supprimé', life: 3000 });
        },
        );
      }
    });
  }

  hideDialog() {
    this.thematicDialog = false;
    this.createThematic = false;
    this.submitted = false;
  }


  saveThematic() {
    this.submitted = true;

    if (this.thematic.name?.trim()) {

      if (this.thematic.id) {
          this.thematics[this.findIndexById(String(this.thematic.id))] = this.thematic;
          this.thematicService.updatethematic(this.thematic.id, this.thematic).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Thématique Modifier', life: 3000 });
          });
      } else {

        const formData: Thematic = {
          id: this.thematic.id,
          name: this.thematic.name,
          description: this.thematic.description,
          color: this.thematic.color,
        };

        console.log(formData)

        this.thematics.push(this.thematic);
        this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Thématique Créer', life: 3000 });
        this.thematicService.createthematic(formData).subscribe(response => {
          console.log(response);
        });

      }

      this.thematics = [...this.thematics];
      this.thematicDialog = false;
      this.createThematic = false;
      this.thematic = new Thematic();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    const numericId = Number(id);
    for (let i = 0; i < this.thematics.length; i++) {
      if (this.thematics[i].id === numericId) {
        index = i;
        break;
      }
    }

    return index;
  }

}
