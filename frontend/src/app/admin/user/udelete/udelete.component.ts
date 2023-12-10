import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-udelete',
  templateUrl: './udelete.component.html',
  styleUrls: ['./udelete.component.scss']
})
export class UdeleteComponent {
constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
