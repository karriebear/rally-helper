import { Component, OnInit } from '@angular/core';
import { Api } from '../shared/api'
import { ExportTable } from '../shared/export-table.helper'
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rally-query',
  templateUrl: './rally-query.component.html',
  styleUrls: ['./rally-query.component.css']
})
export class RallyQueryComponent implements OnInit {

  public querySettings = 'hierarchicalrequirement/?fetch=true&start=1&pagesize=100';
  public data: any;
  public releaseCycle: number;
  public USIDs: String;
  public query: String;
  public searching: number = 0;
  public queryRan: String;
  public cycles = [
    { rallyValue: 'IFT cycle 1', sprint: 12 },
    { rallyValue: 'IFT cycle 2', sprint: 13 },
    { rallyValue: 'IFT cycle 3', sprint: 14 },
    { rallyValue: 'IFT cycle 4', sprint: 15 },
    { rallyValue: 'IFT cycle 5', sprint: 16 }
  ];

  constructor(public api: Api, public exportTable: ExportTable) {
    console.log(sessionStorage);
  }

  ngOnInit() {
    console.log('loaded');
  }

  public runQuery() {
    this.search('&query=' + this.query);
  }

  public searchIFTCycle() {
    let queryBuilder = '&query=';
    if (this.releaseCycle > 0) {
      // Query: (all US in selected cycle and in associated sprint or earlier) or (all US
      // create query string for all sprints less than sprint associated with selected cycle
      let sprintQuery = '(Iteration.Name = "Sprint 5")';
      for (var i = 6; i <= this.cycles[this.releaseCycle].sprint; i++) {
        sprintQuery = this.addQueryCondition(sprintQuery, 'or', '(Iteration.Name = "Sprint ' + i + '")');
      }

      let releaseQuery = '(Release.Name = "IFT cycle 1")';
      for (var j = 0; j <= this.releaseCycle; j++) {
        releaseQuery = this.addQueryCondition(releaseQuery, 'or', '(Release.Name = "' + this.cycles[j].rallyValue + '")')
      }

      // add condition for release
      queryBuilder += '(' + sprintQuery + ' and ' + releaseQuery + ')';

      this.search(queryBuilder);
    }
  }

  public searchUSIDs() {
    let queryBuilder = '';

    this.USIDs.split(',').forEach(id => {
      if (queryBuilder.length == 0) {
        queryBuilder = '(FormattedID = ' + id + ')'
      }
      else {
        queryBuilder = this.addQueryCondition(queryBuilder, 'or', '(FormattedID = ' + id + ')');
      }
    });

    this.search('&query=' + queryBuilder);
  }

  public search(queryBuilder: String) {
    this.searching = 1;
    this.api.get(this.querySettings + queryBuilder).subscribe(data => {
      this.data = data.json().QueryResult.Results;
      this.getPredecessors();
      this.getSucessors();
      --this.searching;
      this.queryRan = queryBuilder.replace(/\(|\)|&query=/g,'');
    });
  }

  public getPredecessors() {
    this.data.forEach((story, index) => {
      if(story.Predecessors.Count > 0) {
        ++this.searching;
        this.api.get(this.data[index].ObjectID + '/Predecessors').subscribe(data => {
          this.data[index].dependencies = '';

          data.json().QueryResult.Results.forEach(story => {
            this.data[index].dependencies += story.FormattedID + (story.Iteration ? '(' + story.Iteration._refObjectName + '); ' : ';');
          });
          --this.searching;
        });
      }
    });
  }

  public getSucessors() {
    this.data.forEach((story, index) => {
      if(story.Successors.Count > 0) {
        ++this.searching;
        this.api.get(this.data[index].ObjectID + '/Successors').subscribe(data => {
          this.data[index].successors = '';

          data.json().QueryResult.Results.forEach(story => {
            this.data[index].successors += story.FormattedID + (story.Iteration ? '(' + story.Iteration._refObjectName + '); ' : ';');
          });
          --this.searching;
        });
      }
    });
  }

  public addQueryCondition(query: String, operator: String, condition: String) {
    return '(' + query + ' ' + operator + ' ' + condition + ')';
  }

  public export() {
    //this.exportTable.exportToCSV();
  }
}
