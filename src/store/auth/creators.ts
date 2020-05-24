import { AuthActionTypes, LOGOUT, CHANGE_LOGIN_STATE, LOGGED_IN, LOGIN_ERROR, SET_TOKEN_SUCCESS } from './types';

export function loginSuccess(token: string): AuthActionTypes {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: { loggedIn: LOGGED_IN, token: token },
  };
}

export function tokenSetSuccess(): AuthActionTypes {
  return { type: SET_TOKEN_SUCCESS };
}

export function loginError(): AuthActionTypes {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: { loggedIn: LOGIN_ERROR },
  };
}

export function logoutCreator(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}
