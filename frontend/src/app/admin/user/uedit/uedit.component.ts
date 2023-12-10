import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uedit',
  templateUrl: './uedit.component.html',
  styleUrls: ['./uedit.component.scss']
})
export class UeditComponent {
  constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
