import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User('', '', '');

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.user)
      .subscribe((user: User) => {
        console.log(user);
      }, (error) => {
        console.error(error);
      });
  }

}
