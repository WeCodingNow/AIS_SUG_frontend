import { ThunkAction } from 'redux-thunk';

import { DisciplineActionTypes, Discipline } from './types';
import { putDiscipline } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, DisciplineActionTypes>;

export const getDiscipline = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Discipline.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putDiscipline(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get discipline ", id);
  }
};

export const getDisciplines = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Discipline.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((d: Discipline) => dispatch(putDiscipline(d)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get disciplines");
  }
};
