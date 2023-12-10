import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sedit',
  templateUrl: './sedit.component.html',
  styleUrls: ['./sedit.component.scss']
})
export class SeditComponent {
  constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
