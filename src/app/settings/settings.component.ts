import { Component, OnInit, ViewChild} from '@angular/core';
import { Api } from '../shared/api'
import { RallyData } from '../shared/rally-data'
import { User } from '../shared/user'
import { DatatableComponent } from '@swimlane/ngx-datatable';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rally-query',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class RallySettings implements OnInit {
  public email: string;
  public password: string;
  public data = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public api: Api, public rallyData: RallyData, public user: User) {
    var auth = sessionStorage.getItem('auth');
  }

  ngOnInit() {
    console.log('loaded');
  }

  public updateCreds() {
    this.user.updateCreds(this.email, this.password);
    sessionStorage.setItem('auth', btoa(this.email + ':' + this.password));
    this.email = '';
    this.password = '';
  }

  public clearCreds() {
    sessionStorage.clear();
  }

  public importData() {
    this.rallyData.getFeatures().subscribe(data => {
      this.data.push(data);
    });
  }

  public updateFilter(event) {
    const val = event.target.value;
    // filter our data
    const temp = this.rallyData.data.filter(function(story) {
      return story.initiative.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.data = temp;
    // Whenever the filter changes, always go back to the first page
    console.log(this.table);
    this.table.offset = 0;
  }
}
