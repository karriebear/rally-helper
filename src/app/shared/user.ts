import { Injectable } from '@angular/core';

@Injectable()
export class User {
  public user: any;

  constructor() {
    this.user = atob(sessionStorage.getItem('auth')).split(':')[0];
  }

  public updateCreds(email: string, password: string) {
    sessionStorage.setItem('auth', btoa(email + ':' + password));
    this.user = email;
  }

  public clearCreds() {
    sessionStorage.clear();
    this.user = ''
  }

  public getUser() {
    return this.user;
  }
}
