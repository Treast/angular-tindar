import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../place';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../place.service';
import { EventService } from '../event.service';
import { Event } from '../event';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  placeUuid: string;
  place: Observable<Place>;
  event: Event = new Event();

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.placeUuid = this.route.snapshot.paramMap.get('uuid');
    this.place = this.placeService.getPlace(this.placeUuid);
  }

  onSubmit() {
    this.eventService.postEvent(this.placeUuid, this.event)
      .subscribe((event: Event) => {
        console.log('Event ', event);
        Swal({
          type: 'success',
          title: 'Succès',
          text: 'Évenement crée !'
        }).then(() => {
          this.router.navigate(['/places/' + this.placeUuid + '/events/' + event.uuid]);
        });
    }, error => {
        Swal({
          type: 'error',
          title: 'Erreur',
          text: 'Merci de remplir tous les champs correctement'
        });
        console.log('Error', error);
      });
  }

}
