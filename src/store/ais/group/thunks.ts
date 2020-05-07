import { ThunkAction } from 'redux-thunk';

import { GroupActionTypes, Group } from './types';
import { putGroup } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, GroupActionTypes>;

export const getGroup = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Group.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putGroup(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get group ", id);
  }
};

export const getGroups = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Group.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((g: Group) => dispatch(putGroup(g)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get groups");
  }
};
