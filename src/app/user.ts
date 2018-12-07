export class User {
  uuid: string;
  email: string;
  password: string;
  token: string;

  constructor(uuid: string, email: string, password: string, token: string) {
    this.uuid = uuid;
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
