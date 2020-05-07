import { ThunkAction } from 'redux-thunk';

import { StudentActionTypes, Student } from './types';
import { putStudent } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, StudentActionTypes>;

export const getStudent = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Student.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putStudent(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get student ", id);
  }
};

export const getStudents = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Student.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((s: Student) => dispatch(putStudent(s)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get students");
  }
};
