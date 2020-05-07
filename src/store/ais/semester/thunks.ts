import { ThunkAction } from 'redux-thunk';

import { SemesterActionTypes, Semester, toSemester } from './types';
import { putSemester } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, SemesterActionTypes>;

export const getSemester = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Semester.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putSemester(toSemester(jsonedResp)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get semester ", id);
  }
};

export const getSemesters = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Semester.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((s: Semester) => dispatch(putSemester(toSemester(s))));
  } catch (e) {
    console.log(e);
    console.log("couldn't get semesters");
  }
};
