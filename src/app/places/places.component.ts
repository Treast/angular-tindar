import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Observable<Place[]>;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    console.log('Places');
    this.places = this.placeService.getPlaces();
  }

}
