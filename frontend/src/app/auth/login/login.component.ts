import { Component } from '@angular/core';
import { ICredential } from 'src/app/_interfaces/credential';
import { IToken } from 'src/app/_interfaces/token';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  form: ICredential = {
    email: '',
    password: ''
  }

  onSubmit(){
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data  => console.log(data.token),
      err => console.log(err)
    )
  }
}
