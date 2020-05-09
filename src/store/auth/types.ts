import { Action } from 'redux';

export const UNLOGGED = 'UNLOGGED';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_ERROR = 'LOGIN_ERROR';

type LoggedInState = typeof UNLOGGED | typeof LOGGED_IN | typeof LOGIN_ERROR;

export interface AuthState {
  loggedIn: LoggedInState;
  token?: string;
}

export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE';
export const LOGOUT = 'TRY_LOGOUT';

interface ChangeAuthState extends Action<typeof CHANGE_LOGIN_STATE> {
  payload: AuthState;
}

type Logout = Action<typeof LOGOUT>;

export type AuthActionTypes = Logout | ChangeAuthState;
