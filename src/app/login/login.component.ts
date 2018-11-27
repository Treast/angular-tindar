import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User('', '', '');

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.user)
      .subscribe((user: User) => {
        console.log('Login: ', user);
        this.authenticationService.setToken(user.token);
        this.router.navigate(['/']);
      }, (error) => {
        console.error(error);
      });
  }

}
