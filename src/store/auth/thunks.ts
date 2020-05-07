import { ThunkAction } from 'redux-thunk';
import { LoginInfo, AuthActionTypes } from './types';
import { loginSuccess } from './creators';
import { State } from '../store';

const API_URL = 'http://localhost:8080';

type ThunkResult<R> = ThunkAction<R, State, undefined, AuthActionTypes>;

const validCreds = (username: string, password: string): boolean => username.length > 0 && password.length > 0;

export const login = (username: string, password: string, noCheckCreds?: boolean): ThunkResult<void> => async (
  dispatch,
) => {
  if (noCheckCreds || validCreds(username, password)) {
    try {
      const apiResp = await fetch(`${API_URL}/sign-in`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (apiResp.status === 200) {
        const userData: LoginInfo = await apiResp.json();
        dispatch(loginSuccess(userData));
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('Invalid creds: ', { username, password });
  }
};

export const signUp = (username: string, password: string): ThunkResult<void> => async (dispatch) => {
  if (validCreds(username, password)) {
    try {
      const apiResp = await fetch(`${API_URL}/sign-up`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (apiResp.status === 200) {
        dispatch(login(username, password, true));
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('Invalid creds: ', { username, password });
  }
};
