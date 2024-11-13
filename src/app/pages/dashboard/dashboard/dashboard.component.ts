import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { selectUsers } from 'src/app/state';
import { AddUser, DeleteUser, GetUsersData, UpdateUser } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.state';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: User[] = [];
  editIndex = -1;
  saveClicked = false;
  addClicked = false;
  newUser: User;
  editUser: User;
  currentUser: User;
  constructor(private store: Store<AppState>, private localDataService: LocalStorageService) { }

  ngOnInit() {
    this.getData();
    this.initNewUser();
    this.currentUser = this.localDataService.getCurrentUserData();
  }

  initNewUser() {
    this.newUser = new User();
  }

  getData() {
    // Trigger Get event
    this.store.dispatch(new GetUsersData([]));
    // Subscriber for data change or get
    this.store.pipe(select(selectUsers)).subscribe(data => {
      this.data = data;
    }, e => console.error(e));
  }

  DeleteItem(index) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new DeleteUser(index));
        swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your User is safe :)',
          'error'
        );
      }
    });
  }

  UpdateRecord(index: number) {
    this.saveClicked = true;
    if (this.editUser.userName.trim() !== '' &&
      this.editUser.password.trim() !== '' &&
      !this.isUsernameAlreadyExists(this.editUser.userName, index)) {
      this.saveClicked = false;
      this.store.dispatch(new UpdateUser(this.editUser, index));
      swal.fire({
        title: 'Record updated!',
        text: 'You can see updated record in table!',
        icon: 'success',
        timer: 1000
      });
      this.editIndex = -1;
    }
  }

  editUserClick(item: User) {
    this.editUser = JSON.parse(JSON.stringify(item));
  }

  addUser() {
    this.addClicked = true;
    if (this.newUser.userName.trim() !== '' &&
      this.newUser.password.trim() !== '' &&
      !this.isUsernameAlreadyExists(this.newUser.userName)) {
      this.addClicked = false;
      this.store.dispatch(new AddUser(this.newUser));
      swal.fire({
        title: 'Record Added Successfully!',
        text: 'You can see new record in table!',
        icon: 'success',
        timer: 1000
      });
      this.initNewUser();
    }
  }

  isUsernameAlreadyExists(userName: string, i?: number) {
    if (!userName) {
      return;
    }
    const index = (this.data || []).findIndex(x => x.userName.toLowerCase() === userName.toLowerCase());
    if (index === i) {
      return false;
    } else if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

}
