import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const GET_USERSLIST = '[User] Get';
export const GET_USERSLIST_SUCCESS = '[User] User Loaded Success';
export const ADD_USER = '[User] Add';
export const UPDATE_USER = '[User] Update';
export const DELETE_USER = '[User] Delete';

export class UserActionType implements Action {
  type: string;
  data: User[];
}
export class GetUsersData implements Action {
  readonly type = GET_USERSLIST;
  constructor(public payload: User[]) { }
}

export class GetUsersSuccess implements Action {
  readonly type = GET_USERSLIST_SUCCESS;
  constructor(public payload: { data: User[] }) { }
}

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: User) { }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: User, public index: number) { }
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(public index: number) { }
}

// @Injectable()
export type UsersAction = GetUsersData | GetUsersSuccess | UpdateUser | DeleteUser | AddUser;
