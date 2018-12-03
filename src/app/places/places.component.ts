import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../place';
import { PlaceService } from '../place.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Observable<Place[]>;
  map: any;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    console.log('Places');
    this.places = this.placeService.getPlaces();
    this.map = L.map('map').setView([45.9019, 6.12798827], 14);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Places Map'
    }).addTo(this.map);
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.places.subscribe((places: Place[]) => {
      places.map((place) => {
        if (place.latitude && place.longitude) {
          L.marker([place.latitude, place.longitude], {icon: myIcon}).bindPopup(place.name).addTo(this.map);
        }
      });
    });
  }

}
