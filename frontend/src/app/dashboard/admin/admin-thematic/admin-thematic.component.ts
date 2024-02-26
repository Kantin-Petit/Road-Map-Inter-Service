import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { ThematicModel } from '../../../models/thematic-model';
import { AuthService } from '../../../services/auth.service';
import { ThematicService } from '../../../services/thematic.service';
import { of, map } from 'rxjs';
import { AssociationService } from '../../../services/association.service';

@Component({
  selector: 'app-admin-thematic',
  templateUrl: './admin-thematic.component.html',
  styleUrls: ['./admin-thematic.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminThematicComponent implements OnInit {


  @ViewChild('dt') dt!: Table;

  thematics!: ThematicModel[];
  thematic!: ThematicModel
  thematicDialog: boolean = false;
  selectedThematics!: ThematicModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  service!: ThematicModel[];
  createThematic: boolean = false


  constructor(
    private thematicService: ThematicService,
    private messageService: MessageService,
    private AssociationService: AssociationService,
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
    this.thematic = new ThematicModel();
    this.submitted = false;
    this.thematicDialog = true;
  }

  onDialogHide() {
    if (!this.thematicDialog) this.createThematic = false;
  }

  deleteSelectedThematics() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les Thémaitques sélectionnés ? Attention Une Timeline sans thématique ne sera pas visible.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        if (!this.selectedThematics) return
        this.selectedThematics.forEach(thematic => {
          this.thematicService.deletethematic(thematic['id']).subscribe()
        });

        this.thematics = this.thematics.filter((val) => !this.selectedThematics?.includes(val));
        this.selectedThematics = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Thematique Supprimer', life: 3000 });

      }
    });
  }

  editThematic(thematic: ThematicModel) {
    this.thematic = { ...thematic };
    this.thematicDialog = true;
  }

  deleteThematic(thematic: ThematicModel) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + thematic.name + '? Attention Une Timeline sans thématique ne sera pas visible.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.thematicService.deletethematic(thematic['id']).subscribe(() => {
          this.thematics = this.thematics.filter((val) => val.id !== thematic['id']);
          this.thematic = new ThematicModel();
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
          this.thematics = [...this.thematics];
          this.thematic = new ThematicModel();
            this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Thématique Modifier', life: 3000 });
          });
      } else {

        const formData: ThematicModel = {
          id: this.thematic.id,
          name: this.thematic.name,
          description: this.thematic.description,
          color: this.thematic.color,
        };


        this.thematicService.createthematic(formData).subscribe(response => {
          this.thematic = response.thematic;
          this.thematics.push(this.thematic);
          this.thematics = [...this.thematics];
          this.thematic = new ThematicModel();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Thématique Créer', life: 3000 });
        });

      }

      this.thematicDialog = false;
      this.createThematic = false;
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
