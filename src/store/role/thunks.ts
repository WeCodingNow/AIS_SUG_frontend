import { putRole } from './creators';
import { ThunkAction } from 'redux-thunk';
import { RoleActionTypes, toRole } from './types';

import AisAPI from '../../services/ais';
import { State } from '../store';

type ThunkResult<R> = ThunkAction<R, State, undefined, RoleActionTypes>;

export const getRole = (): ThunkResult<Promise<any>> => async () => {
  try {
    const resp = await AisAPI.Role.Get();
    return resp.json().then();
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
