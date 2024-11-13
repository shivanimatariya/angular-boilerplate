import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) { }

  getUsersList(): Promise<User[]> {
    return of(this.localStorageService.getUserData()).toPromise();
  }

  deleteUser(index: number): Promise<User[]> {
    const data = this.localStorageService.getUserData();
    if (index > -1) {
      data.splice(index, 1);
      this.localStorageService.setUserData(data);
    }
    return of(this.localStorageService.getUserData()).toPromise();
  }

  updateUser(item: User, index: number): Promise<User[]> {
    const data = this.localStorageService.getUserData();
    if (index > -1) {
      data[index] = item;
      this.localStorageService.setUserData(data);
    }
    return of(this.localStorageService.getUserData()).toPromise();
  }

  addUser(item: User): Promise<User[]> {
    const data = this.localStorageService.getUserData();
    data.push(item);
    this.localStorageService.setUserData(data);
    return of(this.localStorageService.getUserData()).toPromise();
  }
}
