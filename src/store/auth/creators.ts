import { AuthActionTypes, LOGOUT, CHANGE_LOGIN_STATE, LOGGED_IN, LOGIN_ERROR } from './types';

export function loginSuccess(token: string): AuthActionTypes {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: { loggedIn: LOGGED_IN, token: token },
  };
}

export function loginError(): AuthActionTypes {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: { loggedIn: LOGIN_ERROR },
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}
