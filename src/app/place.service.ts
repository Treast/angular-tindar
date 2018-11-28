import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${Config.BASE_URL}/places`, this.authenticationService.getAuthenticationHeaders());
  }


  getPlace(placeUuid: string): Observable<Place> {
    console.log('GetPlace');
    return this.http.get<Place>(`${Config.BASE_URL}/places/${placeUuid}`, this.authenticationService.getAuthenticationHeaders());
  }
}
