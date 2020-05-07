import { ThunkAction } from 'redux-thunk';

import { ControlEventTypeActionTypes, ControlEventType } from './types';
import { putControlEventType } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, ControlEventTypeActionTypes>;

export const getControlEventType = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ControlEventType.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putControlEventType(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get control event type ", id);
  }
};

export const getControlEventTypes = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ControlEventType.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((c: ControlEventType) => dispatch(putControlEventType(c)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get control event types");
  }
};
