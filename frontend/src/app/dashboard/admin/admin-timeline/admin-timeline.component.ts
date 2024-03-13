import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TimelineModel } from '../../../models/timeline-model';
import { TimelineService } from '../../../services/timeline.service';
import { ThematicModel } from 'src/app/models/thematic-model';
import { ThematicService } from 'src/app/services/thematic.service';
import { AssociationService } from '../../../services/association.service';
import { ShareService } from '../../../services/share.service';
import { environment } from 'src/environments/environment';
import { ServiceService } from '../../../services/service.service';
import { ServiceModel } from 'src/app/models/service-model';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-admin-timeline',
  templateUrl: './admin-timeline.component.html',
  styleUrls: ['./admin-timeline.component.scss']
})
export class AdminTimelineComponent implements OnInit {

  @ViewChild('dt') dt!: Table;
  @ViewChild('fileInput') fileInput: any;

  timelines!: TimelineModel[];
  timeline!: TimelineModel
  timelineDialog: boolean = false;
  selectedTimelines!: TimelineModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  createTimeline: boolean = false
  thematicList: ThematicModel[] = [];
  serviceList!: ServiceModel[];
  socketUrl: string = environment.socketUrl;
  imageUrl: any = null;
  imageFile: any = null;
  originalService!: string | number;

  thematicAssociationsToCreate: { timeline_id: number, thematic: ThematicModel }[] = [];
  thematicAssociationsToDelete: { timeline_id: number, thematic: ThematicModel }[] = [];

  constructor(
    private timelineService: TimelineService,
    private messageService: MessageService,
    private thematicService: ThematicService,
    private serviceService: ServiceService,
    private authService: AuthService,
    private AssociationService: AssociationService,
    public shareService: ShareService,
    private confirmationService: ConfirmationService) {}

  ngOnInit() {

    this.timelineService.getListTimeline().subscribe(response => {
      this.timelines = response;
    });

    this.thematicService.getAllthematic().subscribe(response => {
      this.thematicList = response;
    });

    if (this.getRole() === 'admin') {
      this.serviceService.getAllService().subscribe(services => {
        this.serviceList = services;
      });
    } else {
      this.serviceList = [];
    }

  }

  getRole() {
    return this.authService.getRole();
  }

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(inputValue, 'contains');
  }

  openNew() {
    this.createTimeline = true;
    this.timeline = new TimelineModel();
    this.submitted = false;
    this.timelineDialog = true;

  }

  onDialogHide() {
    if (!this.timelineDialog) this.createTimeline = false;
    this.imageUrl = null;
    this.imageFile = null;
    if(this.fileInput) this.fileInput.nativeElement.value = '';

  }

  validTimeline(): boolean {
    return (
      Boolean(this.timeline.title) &&
      Boolean(this.timeline.text) &&
      Boolean(this.timeline.date_start) &&
      Boolean(this.timeline.date_end) &&
      Boolean(this.timeline.service_id || this.getRole() !== 'admin')
    );
  }

  deleteSelectedTimelines() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        if (!this.selectedTimelines) return
        this.selectedTimelines.forEach(timeline => {
          this.timelineService.deleteTimeline(timeline['id']).subscribe();
        });

        this.timelines = this.timelines.filter((val) => !this.selectedTimelines?.includes(val));
        this.selectedTimelines = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Timeline Supprimer', life: 3000 });

      }
    });
  }

  editTimeline(timeline: TimelineModel): string {
    this.timeline = { ...timeline };
    if (!this.timelineDialog) this.originalService = this.timeline.service_id
    this.timelineDialog = true;
    return this.socketUrl + '/images/services/service' + this.originalService + '/timeline' + timeline.id + '/' + timeline.image;
  }

  deleteTimeline(timeline: TimelineModel) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ' + timeline.title + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle m-2',
      accept: () => {
        this.timelineService.deleteTimeline(timeline['id']).subscribe(() => {
          this.timelines = this.timelines.filter((val) => val.id !== timeline['id']);
          this.timeline = new TimelineModel();
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Timeline supprimé', life: 3000 });
        },
        );
      }
    });
  }

  hideDialog() {
    this.timelineDialog = false;
    this.createTimeline = false;
    this.submitted = false;
    this.imageUrl = null;
    this.imageFile = null;
    this.fileInput.nativeElement.value = '';

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  resetImage() {
    this.imageUrl = null;
    this.imageFile = null;
    this.fileInput.nativeElement.value = '';
  }

  createFormData() {

    const formDataWithImage = new FormData();
    if (this.timeline.id) formDataWithImage.append('id', String(this.timeline.id));
    formDataWithImage.append('title', this.timeline.title);
    formDataWithImage.append('text', this.timeline.text);
    formDataWithImage.append('date_start', String(this.timeline.date_start));
    formDataWithImage.append('date_end', String(this.timeline.date_end));
    formDataWithImage.append('service_id', String(this.timeline.service_id));
    formDataWithImage.append('type', 'timeline');
    formDataWithImage.append('image', this.imageFile, this.imageFile.name);
    return formDataWithImage;
  }

  compareDate(): boolean {
    if (this.timeline.date_end && this.timeline.date_start) {
      return new Date(this.timeline.date_end) > new Date(this.timeline.date_start);
    }
    return false;
  }

  saveTimeline() {
    this.submitted = true;

    if (this.timeline.title?.trim()) {

      if (this.timeline.id) {

        if (!this.validTimeline()) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs', life: 3000 });
          return;
        }

        if (!this.compareDate()) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La date de fin doit être supérieure à la date de début', life: 3000 });
          return;
        }

        this.timeline.service_id = Number(this.timeline.service_id);

        const DATA = this.imageFile ? this.createFormData() : this.timeline;

        const index = this.findIndexById(String(this.timeline.id));
        this.timelineService.updateTimeline(this.timeline.id, DATA).subscribe(reponse => {
          this.createAssociation();
          this.removeAssocation();
          this.timelines[index] = this.timeline;
          if (this.imageFile) this.timelines[index].image = reponse.image;
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Timeline Modifier', life: 3000 });
          this.timelines = [...this.timelines];
          this.timeline = new TimelineModel();
        });
      } else {

        const formData: TimelineModel = {
          id: this.timeline.id,
          title: this.timeline.title,
          text: this.timeline.text,
          date_start: this.timeline.date_start,
          date_end: this.timeline.date_end,
          service_id: this.timeline.service_id,
          Thematics: this.timeline.Thematics
        };

        if (!this.validTimeline()) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs', life: 3000 });
          return;
        }

        if (!this.compareDate()) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La date de fin doit être supérieure à la date de début', life: 3000 });
          return;
        }

        this.timelineService.createTimeline(formData).subscribe(response => {

          this.timeline = response.timeline;
          this.createAssociation(true);

          if (this.imageFile) {
            this.timelineService.updateTimeline(this.timeline.id, this.createFormData()).subscribe(reponse => {
              this.timeline.image = reponse.image;
              this.endOfSubmitTimeline();
            });
          } else {
            if (!this.timeline.image) this.timeline.image = null;
            this.endOfSubmitTimeline();
          }

        });

      }

      this.timelineDialog = false;
      this.createTimeline = false;

    }
  }

  endOfSubmitTimeline() {
    this.timelines.push(this.timeline);
    this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Timeline Créer', life: 3000 });
    this.timelines = [...this.timelines];

    this.timeline = new TimelineModel();
    this.imageUrl = null;
    this.imageFile = null;
  }

  findIndexById(id: string): number {
    let index = -1;
    const numericId = Number(id);
    for (let i = 0; i < this.timelines.length; i++) {
      if (this.timelines[i].id === numericId) {
        index = i;
        break;
      }
    }

    return index;
  }

  isChecked(thematics: any[], thematicId: number) {
    if(!thematics) return false;
    return thematics.some(thematic => thematic.id === thematicId);
  }

  updateThematic(event: any, timelineId: number, thematic: ThematicModel) {

    const data = {
      timeline_id: timelineId,
      thematic: thematic
    };

    if (event.target.checked) {
      this.thematicAssociationsToCreate.push(data);
    } else {
      this.thematicAssociationsToDelete.push(data);
    }
  }

  createAssociation(isNew: boolean = false) {
    this.thematicAssociationsToCreate.forEach(element => {

      this.timeline.Thematics.push(element.thematic);

      if(isNew) element.timeline_id = this.timeline.id;

      const data = {
        timeline_id: element.timeline_id,
        thematic_id: element.thematic.id
      };

      this.AssociationService.createAssociation(data).subscribe(() => {
        this.thematicAssociationsToCreate = [];
      });


    });

  }

  removeAssocation() {

    this.thematicAssociationsToDelete.forEach(element => {

      const valueToDelete = element.thematic.id;
      const index = this.timeline.Thematics.findIndex(element => element.id === valueToDelete);
      if (index !== -1) { this.timeline.Thematics.splice(index, 1) }
      this.AssociationService.deleteAssociation(element.timeline_id, element.thematic.id).subscribe(response => {
        this.thematicAssociationsToDelete = [];
      });
    });
  }

}
