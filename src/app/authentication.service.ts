import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string = null;

  constructor() { }

  isAuthenticated() {
    return this.token !== null;
  }

  getToken() {
    return this.token;
  }

  login(token) {
    this.token = token;
  }

  logout() {
    this.token = null;
  }
}
