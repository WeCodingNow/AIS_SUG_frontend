import { ThunkAction } from 'redux-thunk';
import { AuthActionTypes } from './types';
import { loginSuccess, loginError } from './creators';
import { State } from '../store';

import AisAPI from '../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, AuthActionTypes>;

const validCreds = (username: string, password: string): boolean => username.length > 0 && password.length > 0;

export const login = (username: string, password: string): ThunkResult<void> => async (dispatch) => {
  if (validCreds(username, password)) {
    try {
      const resp = await AisAPI.SignIn.Post({ username, password });
      if (resp.status === 200) {
        const token = await resp.json();
        dispatch(loginSuccess(token));
      } else {
        dispatch(loginError());
      }
    } catch (e) {
      dispatch(loginError());
    }
  } else {
    console.log('Invalid creds: ', { username, password });
    dispatch(loginError());
  }
};
