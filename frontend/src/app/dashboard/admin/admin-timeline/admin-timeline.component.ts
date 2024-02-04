import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ServiceService } from '../../../services/service.service'
import { TimelineModel } from '../../../models/timeline-model';
import { TimelineService } from '../../../services/timeline.service';
import { AssociationModel } from 'src/app/models/association-model';
import { ThematicModel } from 'src/app/models/thematic-model';
import { ThematicService } from 'src/app/services/thematic.service';
import { AssociationService } from '../../../services/association.service';

@Component({
  selector: 'app-admin-timeline',
  templateUrl: './admin-timeline.component.html',
  styleUrls: ['./admin-timeline.component.scss']
})
export class AdminTimelineComponent {


  @ViewChild('dt') dt!: Table;

  timelines!: TimelineModel[];
  timeline!: TimelineModel
  timelineDialog: boolean = false;
  selectedTimelines!: TimelineModel[] | null;
  submitted: boolean = false;
  Delete!: string;
  createTimeline: boolean = false
  serviceName: string = '';
  thematicList: ThematicModel[] = [];

  constructor(
    private timelineService: TimelineService,
    private messageService: MessageService,
    private thematicService: ThematicService,
    private AssociationService: AssociationService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.timelineService.getListTimeline(this.serviceName).subscribe(response => {
      this.timelines = response;
    });

    this.thematicService.getAllthematic().subscribe(response => {
      this.thematicList = response;
    });
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

  editTimeline(timeline: TimelineModel) {
    this.timeline = { ...timeline };
    this.timelineDialog = true;
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
  }


  saveTimeline() {
    this.submitted = true;

    if (this.timeline.title?.trim()) {

      if (this.timeline.id) {
        this.timelines[this.findIndexById(String(this.timeline.id))] = this.timeline;
        this.timelineService.updateTimeline(this.timeline.id, this.timeline).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Timeline Modifier', life: 3000 });
        });
      } else {

        const formData: TimelineModel = {
          id: this.timeline.id,
          title: this.timeline.title,
          text: this.timeline.text,
          image: this.timeline.image,
          date_start: this.timeline.date_start,
          date_end: this.timeline.date_end,
          serviceId: this.timeline.serviceId,
          Thematics: this.timeline.Thematics
        };

        this.timelines.push(this.timeline);
        this.messageService.add({ severity: 'success', summary: 'Réussite', detail: 'Timeline Créer', life: 3000 });
        this.timelineService.createTimeline(formData).subscribe(response => {
          console.log(response);
        });

      }

      this.timelines = [...this.timelines];
      this.timelineDialog = false;
      this.createTimeline = false;
      this.timeline = new TimelineModel();
    }
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
    return thematics.some(thematic => thematic.id === thematicId);
  }

  updateThematic(event: any, timelineId: number, thematId: number) {

    if (event.target.checked) {

      const data = {
        timeline_id: timelineId,
        thematic_id: thematId
      };

      this.AssociationService.createAssociation(data).subscribe(response => {
        console.log(response);
      });

    } else {
      this.AssociationService.deleteAssociation(timelineId, thematId).subscribe(response => {
        console.log(response);
      });
    }
  }

}
