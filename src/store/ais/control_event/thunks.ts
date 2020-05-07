import { ThunkAction } from 'redux-thunk';

import { ControlEventActionTypes, ControlEvent } from './types';
import { putControlEvent } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, ControlEventActionTypes>;

export const getControlEvent = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ControlEvent.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putControlEvent(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get control event ", id);
  }
};

export const getControlEvents = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ControlEvent.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((c: ControlEvent) => dispatch(putControlEvent(c)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get control events");
  }
};
