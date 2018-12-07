import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  getEventDate(date) {
    const d = moment(date).format('dddd DD/MM');
    return d[0].toUpperCase() + d.substr(1).toLowerCase();
  }

}
