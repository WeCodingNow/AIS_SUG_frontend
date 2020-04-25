export interface LoginInfo {
  username: string;
  password: string;
}

export interface AuthState {
  loggedIn: boolean;
  username: string;
  token: string;
}

export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const TRY_LOGOUT = 'TRY_LOGOUT';

interface TryLogin {
  type: typeof TRY_LOGIN;
  payload: LoginInfo;
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: LoginInfo;
}

interface TrySignup {
  type: typeof TRY_SIGNUP;
  payload: LoginInfo;
}

interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: LoginInfo;
}

interface TryLogoutAction {
  type: typeof TRY_LOGOUT;
}

export type AuthActionTypes = TryLogin | LoginSuccess | TrySignup | SignupSuccess | TryLogoutAction;
