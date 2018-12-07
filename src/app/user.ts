import { Event } from './event';

export class User {
  uuid: string;
  email: string;
  password: string;
  token: string;
  events: Event[];

  constructor(uuid: string, email: string, password: string, token: string) {
    this.uuid = uuid;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
