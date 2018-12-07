import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import { AuthenticationService } from "../authentication.service"

@Component({
  selector: '',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Observable<User[]>;
  user: User;
  places: Observable<Place[]>;
  events: Observable<Event[]>;
  uuid: String;

  constructor(private userService: UserService, private placeService: PlaceService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = new User('', '', '', '');
    this.users = this.userService.getUsers();
    this.places = this.placeService.getPlaces();
    this.uuid = this.authenticationService.getUuid();
    this.users.subscribe(value => { 
      value.forEach(users => {
        if (users.uuid == this.uuid) {
          this.events = users.events;
        }
      });
    });
  }

}
