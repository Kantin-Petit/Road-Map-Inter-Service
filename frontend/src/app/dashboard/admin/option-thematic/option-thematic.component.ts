import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../../../services/timeline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-thematic',
  templateUrl: './option-thematic.component.html',
  styleUrls: ['./option-thematic.component.scss']
})
export class OptionThematicComponent implements OnInit{

  constructor(
    private timelineService: TimelineService,
    private router: Router) { }

  test!: number;

  ngOnInit(): void {
    this.test = this.timelineService.getOptionThematic();
    if (this.test == undefined) this.router.navigate(['/dashboard/timelines']);
  }

}
