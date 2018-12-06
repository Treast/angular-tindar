import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from './place';
import { Event } from './event';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  getEvent(placeUuid: string, eventUuid: string): Observable<Event> {
    console.log('GetEvent');
    return this.http.get<Event>(`${Config.BASE_URL}/places/${placeUuid}/events/${eventUuid}`,
      this.authenticationService.getAuthenticationHeaders());
  }
}
