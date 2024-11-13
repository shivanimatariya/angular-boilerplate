import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  AddUser,
  ADD_USER,
  DeleteUser,
  DELETE_USER,
  GetUsersData,
  GetUsersSuccess,
  GET_USERSLIST,
  UpdateUser,
  UPDATE_USER
} from '../actions/user.action';



@Injectable()
export class UserEffect {

  constructor(private actions$: Actions, private userSerive: UserService) { }

  @Effect()
  loadUsersList$ = this.actions$
    .pipe(
      ofType<GetUsersData>(GET_USERSLIST),
      mergeMap((action) => this.userSerive.getUsersList()
        .then(data => {
          return (new GetUsersSuccess({ data }));
        })
      ));

  @Effect()
  deleteUser$ = this.actions$
    .pipe(
      ofType<DeleteUser>(DELETE_USER),
      mergeMap((action) => this.userSerive.deleteUser(action.index)
        .then(data => {
          return (new GetUsersSuccess({ data }));
        })
      ));

  @Effect()
  updateUser$ = this.actions$
    .pipe(
      ofType<UpdateUser>(UPDATE_USER),
      mergeMap((action) => this.userSerive.updateUser(action.payload, action.index)
        .then(data => {
          return (new GetUsersSuccess({ data }));
        })
      ));

  @Effect()
  addUser$ = this.actions$
    .pipe(
      ofType<AddUser>(ADD_USER),
      mergeMap((action) => this.userSerive.addUser(action.payload)
        .then(data => {
          return (new GetUsersSuccess({ data }));
        })
      ));



}
