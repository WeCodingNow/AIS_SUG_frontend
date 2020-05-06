import { Action } from 'redux';

export interface LoginInfo {
  username: string;
  token: string;
}

export interface AuthState {
  loggedIn: boolean;
  username: undefined | string;
  token: undefined | string;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const LOGOUT = 'TRY_LOGOUT';

interface LoginSuccess extends Action<typeof LOGIN_SUCCESS> {
  payload: LoginInfo;
}

interface SignupSuccess extends Action<typeof SIGNUP_SUCCESS> {
  payload: LoginInfo;
}

type TryLogoutAction = Action<typeof LOGOUT>;

export type AuthActionTypes = LoginSuccess | SignupSuccess | TryLogoutAction;
