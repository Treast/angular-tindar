import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { Event } from '../event';
import * as moment from 'moment';
import * as L from 'leaflet';
import 'moment/locale/fr';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Event;
  event$: Observable<Event>;
  map: any;

  constructor(private route: ActivatedRoute, private eventService: EventService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    moment.locale('fr');
    const placeUuid = this.route.snapshot.paramMap.get('uuid');
    const eventUuid = this.route.snapshot.paramMap.get('eventUuid');
    this.event$ = this.eventService.getEvent(placeUuid, eventUuid);

    this.createMap();
  }

  getEventDate(date) {
    const d = moment(date).format('dddd DD/MM');
    return d[0].toUpperCase() + d.substr(1).toLowerCase();
  }

  createMap() {
    this.event$.subscribe(event => {
      this.event = event;
      if (event.place.latitude && event.place.longitude) {
        this.map = L.map('map').setView([event.place.latitude, event.place.longitude], 20);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Places Map'
        }).addTo(this.map);
        const myIcon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
        });
        L.marker([event.place.latitude, event.place.longitude], {icon: myIcon}).bindPopup(event.place.name).addTo(this.map);
      }
    });
  }

  onAddUserToEvent() {
    console.log('Click');
    this.eventService.postEventUser(this.event)
      .subscribe((event: Event) => {
        console.log('Event', event);
        Swal({
          type: 'success',
          text: 'Vous êtes bien inscrit à cet événement.',
          title: 'Succès'
        }).then(() => {
          this.event = event;
        });
      }, error => {
        console.log('Error', error);
        Swal({
          type: 'error',
          text: 'Une erreur s\'est produite.',
          title: 'Erreur'
        })
      });
  }
}
