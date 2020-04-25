import { AuthState, AuthActionTypes, TRY_LOGOUT, LOGIN_SUCCESS, SIGNUP_SUCCESS } from './types';

const initialState: AuthState = {
  loggedIn: false,
  username: '',
  token: '',
};

function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        username: 'username',
        token: '123456',
      };
    case SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        username: 'username',
        token: '123456',
      };
    case TRY_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
