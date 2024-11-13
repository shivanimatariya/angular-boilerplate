import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  dataString = 'data';
  currentUserString = 'currentUser';
  constructor() { }

  getCurrentUserData(): User {
    return this.getItem(this.currentUserString);
  }

  setCurrentUserData(data) {
    this.setItem(this.currentUserString, data);
  }

  getUserData(): User[] {
    return this.getItem(this.dataString);
  }

  setUserData(data) {
    this.setItem(this.dataString, data);
  }

  removeCurrentUser() {
    this.removeItem(this.currentUserString);
  }

  getItem(name: string): any {
    return JSON.parse(localStorage.getItem(name) || null);
  }

  setItem(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  removeItem(name: any) {
    localStorage.removeItem(name);
  }
}
