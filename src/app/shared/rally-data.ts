import { Api } from '../shared/api'
import { Injectable } from '@angular/core';

@Injectable()
export class RallyData {

  private storyApi = 'hierarchicalrequirement';
  private featureApi = 'portfolioitem/feature'
  private querySettings = '?fetch=true&start=1&pagesize=2000';
  private feature = {};
  private sprintMapping = {
    'Sprint 4': 4,
    'Sprint 5': 5,
    'Sprint 6': 6,
    'Sprint 7': 7,
    'Sprint 8': 8,
    'Sprint 9': 9,
    'Sprint 10': 10,
    'Sprint 10.5 (temp)': 10.5,
    'Sprint 11': 11,
    'Sprint 12': 12,
    'Sprint 13': 13,
    'Sprint 14': 14,
    'Sprint 15': 15,
    'Sprint 16': 16,
    'Sprint 17': 17,
    'Sprint 18': 18,
    'Sprint 19': 19,
    'Sprint 20': 20,
    'Sprint 21': 21,
    'Sprint 22': 22,
    'Sprint 23': 23
  }
  public data: any;
  public searching: number = 0;

  constructor(public api: Api) {
  }

  public getPredecessors(storyUUID, index) {
    ++this.searching;
    this.api.get(this.storyApi + '/' + storyUUID + '/Predecessors').subscribe(data => {
      this.data[index].Predecessors = [];

      data.json().QueryResult.Results.forEach(story => {
        this.data[index].Predecessors.push(story.ObjectID);
        this.data[index].beginSprint = Math.min(this.data[index].beginSprint, this.getSprint(story.Iteration));
      });
      --this.searching;
    });
  }

  public getSprint(iteration: any) {
    return iteration ? this.sprintMapping[iteration._refObjectName] : null;
  }

  public getSucessors(storyUUID, index) {
    ++this.searching;
    this.api.get(this.storyApi + '/' + storyUUID + '/Successors').subscribe(data => {
      this.data[index].Successors = [];

      data.json().QueryResult.Results.forEach(story => {
        this.data[index].Successors.push(story.ObjectID);
        this.data[index].endSprint = Math.max(this.data[index].endSprint, this.getSprint(story.Iteration));
      });
      --this.searching;
    });
  }

  public getFeatures() {
    return this.api.get(this.featureApi + this.querySettings).map(data => {
      data.json().QueryResult.Results.forEach(feature => {
        this.feature[feature.ObjectID] = {
          'initiative': (feature.Parent ? feature.Parent.ObjectName : ''),
          'name': feature.Name
        };
      });
      this.getAllUS();
    });
  }

  public getAllUS() {
    console.log('getting US');
    this.searching = 1;
    this.api.get(this.storyApi + '/' + this.querySettings).subscribe(data => {
      this.data = data.json().QueryResult.Results;
      this.data.forEach((story, index) => {
        story.Iteration = this.getSprint(story.Iteration);
        story.beginSprint = story.Iteration;
        story.endSprint = story.Iteration;
        story.Feature = story.Feature ? this.feature[story.Feature.ObjectID] : null;
        //story.initiative = story.Feature ? this.feature[story.Feature.ObjectID].initiative : null;
        if(story.Predecessors.Count > 0) {
          this.getPredecessors(story.ObjectID, index);
        }
        if(story.Successors.Count > 0) {
          this.getSucessors(story.ObjectID, index);
        }
        --this.searching;
      });
    });
  }
}
