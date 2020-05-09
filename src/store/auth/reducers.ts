import { AuthState, AuthActionTypes, UNLOGGED, LOGOUT, CHANGE_LOGIN_STATE } from './types';

const initialState: AuthState = {
  loggedIn: UNLOGGED,
};

function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
