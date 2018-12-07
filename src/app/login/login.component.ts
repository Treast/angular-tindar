import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User('', '', '', '');

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.user)
      .subscribe((user: User) => {
        console.log('Login: ', user);
        this.authenticationService.setToken(user.token);
        this.authenticationService.setUuid(user.uuid);
        this.router.navigate(['/']).then(() => {
          Swal({
            title: 'Connecté',
            text: 'Vous êtes connecté.',
            type: 'success',
          });
        });
      }, (error) => {
        Swal({
          title: 'Erreur',
          text: 'Mauvais email ou mot de passe.',
          type: 'error',
        });
      });
  }

}
