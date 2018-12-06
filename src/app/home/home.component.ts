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
  userLocation: any;

  constructor(private userService: UserService, private placeService: PlaceService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.places = this.placeService.getPlaces();
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
