import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Observable } from 'rxjs';
import { Place } from '../place';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-around-me',
  templateUrl: './around-me.component.html',
  styleUrls: ['./around-me.component.scss']
})
export class AroundMeComponent implements OnInit {
  places: Observable<Place[]>;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.places = this.placeService.getPlacesSearch(position.coords.latitude, position.coords.longitude);
      }, positionError => {
        Swal({
          type: 'error',
          title: 'Erreur',
          text: 'Merci d\'autoriser la géolocation.'
        });
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
    //
  }

}
