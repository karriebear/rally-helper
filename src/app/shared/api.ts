import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Api {
  url: string = 'https://rally1.rallydev.com/slm/webservice/v2.0';
  options: RequestOptions;

  constructor(public http: Http) {
    var auth = sessionStorage.getItem('auth');
    let header = new Headers({
      'Authorization': ('Basic ' + auth)
    });
    this.options = new RequestOptions({ headers: header });
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    options = options || this.options;

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    options = options || this.options;
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    console.log(this.url + '/' + endpoint);
    options = options || this.options;
    return this.http.delete(this.url + '/' + endpoint, options).catch(this.handleError);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
