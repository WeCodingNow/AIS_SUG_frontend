import { ThunkAction } from 'redux-thunk';

import AisAPI from '../../services/ais';

import { State } from '../store';
import { AuthActionTypes } from './types';
import { loginSuccess, loginError, logoutCreator } from './creators';
import { MeActionTypes, toRole, toInfo } from '../me/types';
import { clearMe, putRole, putInfo } from '../me/creators';
import { clearAIS } from '../creators';
import { GeneralAISActionType } from '../types';
import { adminID } from '../../roles';

type ThunkResult<R> = ThunkAction<R, State, undefined, AuthActionTypes | MeActionTypes | GeneralAISActionType>;

const validCreds = (username: string, password: string): boolean => username.length > 0 && password.length > 0;

export const login = (username: string, password: string): ThunkResult<void> => async (dispatch) => {
  if (validCreds(username, password)) {
    try {
      const resp = await AisAPI.SignIn.Post({ username, password });
      if (resp.status === 200) {
        const token = (await resp.json()).token;

        const roleResp = await AisAPI.Role.withAuth('Bearer', token).Get();

        const role = toRole(await roleResp.json());

        if (role.id !== adminID) {
          const infoResp = await AisAPI.Info.withAuth('Bearer', token).Get();
          dispatch(putInfo(toInfo(await infoResp.json())));
        }

        dispatch(putRole(role));

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

export const logout = (): ThunkResult<void> => async (dispatch) => {
  dispatch(clearAIS());
  dispatch(clearMe());
  dispatch(logoutCreator());
};
