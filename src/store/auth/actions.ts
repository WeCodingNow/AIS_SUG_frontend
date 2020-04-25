import { LoginInfo, AuthActionTypes, TRY_LOGIN, TRY_LOGOUT, TRY_SIGNUP } from './types';

export function tryLogin(loginInfo: LoginInfo): AuthActionTypes {
  return {
    type: TRY_LOGIN,
    payload: loginInfo,
  };
}

export function trySignup(loginInfo: LoginInfo): AuthActionTypes {
  return {
    type: TRY_SIGNUP,
    payload: loginInfo,
  };
}

export function tryLogout(): AuthActionTypes {
  return {
    type: TRY_LOGOUT,
  };
}
