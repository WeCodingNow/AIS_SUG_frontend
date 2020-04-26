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

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: LoginInfo;
}

interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: LoginInfo;
}

interface TryLogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccess | SignupSuccess | TryLogoutAction;
