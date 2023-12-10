import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sdelete',
  templateUrl: './sdelete.component.html',
  styleUrls: ['./sdelete.component.scss']
})
export class SdeleteComponent {
  constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
