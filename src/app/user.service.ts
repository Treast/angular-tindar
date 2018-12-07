import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${Config.BASE_URL}/users`, this.authenticationService.getAuthenticationHeaders());
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${Config.BASE_URL}/users/${this.authenticationService.getUuid()}`,
      this.authenticationService.getAuthenticationHeaders());
  }
}
