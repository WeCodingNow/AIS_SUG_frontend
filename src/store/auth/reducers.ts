import { AuthState, AuthActionTypes, LOGOUT, LOGIN_SUCCESS } from './types';

const initialState: AuthState = {
  loggedIn: false,
  username: undefined,
  token: undefined,
};

function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
