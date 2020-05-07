import { ThunkAction } from 'redux-thunk';

import { MarkActionTypes, Mark } from './types';
import { putMark } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, MarkActionTypes>;

export const getMark = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Mark.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putMark(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get mark ", id);
  }
};

export const getMarks = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Mark.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((m: Mark) => dispatch(putMark(m)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get marks");
  }
};
