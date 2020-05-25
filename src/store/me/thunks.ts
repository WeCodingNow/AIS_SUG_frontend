import { putRole, putInfo } from './creators';
import { ThunkAction } from 'redux-thunk';
import { MeActionTypes, toRole, toInfo, Info } from './types';

import AisAPI from '../../services/ais';
import { State } from '../store';

type ThunkResult<R> = ThunkAction<R, State, undefined, MeActionTypes>;

export const getRole = (): ThunkResult<Promise<any>> => async () => {
  try {
    const resp = await AisAPI.Role.Get();
    return resp.json();
  } catch (e) {
    console.log(e);
  }
};

export const fillRole = (): ThunkResult<void> => async (dispatch) => {
  try {
    const role = await dispatch(getRole());
    dispatch(putRole(toRole(role)));
  } catch (e) {
    console.log(e);
  }
};

export const getInfo = (): ThunkResult<Promise<any>> => async () => {
  try {
    const resp = await AisAPI.Info.Get();
    return resp.json();
  } catch (e) {
    console.log(e);
  }
};

export const fillInfo = (): ThunkResult<Promise<Info>> => async (dispatch) => {
  try {
    const info = await dispatch(getInfo());
    dispatch(putInfo(toInfo(info)));

    return Promise.resolve(toInfo(info));
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
};
