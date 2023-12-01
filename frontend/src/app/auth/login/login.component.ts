import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http: HttpClient) { }

  form: any = {
    email: null,
    password: null
  }

  onSubmit(){
    console.log(this.form)
    this.http.post("http://localhost:8888/routes/auth", this.form).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }
}
