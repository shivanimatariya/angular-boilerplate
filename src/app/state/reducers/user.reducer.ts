import * as actions from '../actions/user.action';

export function userReducer(state, action: actions.UsersAction) {
  switch (action.type) {

    case actions.GET_USERSLIST:
      return state;

    case actions.GET_USERSLIST_SUCCESS:
      return action.payload.data;

    case actions.ADD_USER:
      return action.payload;

    case actions.UPDATE_USER:
      return action.payload;

    case actions.DELETE_USER:
      return action.index;

    default:
      return state;
  }
}
