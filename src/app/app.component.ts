import { Component } from '@angular/core';
import { User } from './shared/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLogin: string;

  constructor(public user: User) {
    this.userLogin = this.user.getUser();
  }
}
