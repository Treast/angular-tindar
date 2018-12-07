import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  users: Observable<User[]>;
  places: Observable<Place[]>;
  uuid: String;
  userLocation: any;

  public user: User = new User('', '', '', '');

  constructor(private userService: UserService, private placeService: PlaceService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.places = this.placeService.getPlaces();
    this.uuid = this.authenticationService.getUuid();
  }

  ngAfterViewChecked(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      });
    }
  }

}
