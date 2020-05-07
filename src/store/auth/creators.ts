import { LoginInfo, AuthActionTypes, LOGOUT, LOGIN_SUCCESS, SIGNUP_SUCCESS } from './types';

export function loginSuccess(loginInfo: LoginInfo): AuthActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload: loginInfo,
  };
}

export function signupSuccess(loginInfo: LoginInfo): AuthActionTypes {
  return {
    type: SIGNUP_SUCCESS,
    payload: loginInfo,
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}
