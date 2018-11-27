import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User = null;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this.user && this.user.token !== null;
  }

  getToken(): string {
    return this.user.token;
  }

  setToken(token: string) {
    this.user.token = token;
  }

  login(user: User): Observable<User> {
    return this.http.post<User>('http://www.tindart.localhost/login', {
      email: user.email,
      password: user.password
    });
  }

  logout() {
    this.user.token = null;
  }
}
