import { Component, OnInit } from '@angular/core';
import { Api } from '../shared/api'
import { RallyData } from '../shared/rally-data'
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rally-query',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class RallySettings implements OnInit {
  public email: string;
  public password: string;
  public user: string;
  public data: any;

  constructor(public api: Api, public rallyData: RallyData) {
    console.log(sessionStorage);
  }

  ngOnInit() {
    console.log('loaded');
  }

  public updateCreds() {
    sessionStorage.setItem('auth', btoa(this.email + ':' + this.password));
    this.user = this.email;
    this.email = '';
    this.password = '';
  }

  public clearCreds() {
    sessionStorage.clear();
  }

  public importData() {
    this.rallyData.getFeatures().subscribe(data => {
      this.data = data
    });
  }
}
