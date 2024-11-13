import {
  ActionReducerMap,
} from '@ngrx/store';
import { User } from '../models/user';
import { AppState } from './app.state';
import { userReducer } from './reducers/user.reducer';
import * as actions from './actions/user.action';

export const reducers: ActionReducerMap<AppState> = {
  users: userReducer
};


export function usersReducer(state: User[] | [], action: actions.UsersAction): User[] {
  return userReducer(state, action);
}

export const selectUsers = (state: AppState) => state.users;
