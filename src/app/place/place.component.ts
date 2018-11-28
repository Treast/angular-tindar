import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  place: Observable<Place>;

  constructor(private route: ActivatedRoute, private placeService: PlaceService) { }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    this.place = this.placeService.getPlace(uuid);
  }

}
