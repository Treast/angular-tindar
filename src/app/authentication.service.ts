import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User = new User('', '', '');

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this.user && this.getToken() && this.getToken() !== '';
  }

  getToken(): string {
    return this.user.token || localStorage.getItem('token');
  }

  setToken(token: string) {
    this.user.token = token;
    localStorage.setItem('token', token);
  }

  setUuid(uuid: string) {
    localStorage.setItem('uuid', uuid);
  }

  getUuid() {
    return localStorage.getItem('uuid') || null;
  }

  getAuthenticationHeaders() {
    return {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.getToken()
      })
    };
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${Config.BASE_URL}/login`, {
      email: user.email,
      password: user.password
    });
  }

  logout() {
    this.user.token = null;
  }
}
