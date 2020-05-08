import {
  SemesterActionTypes,
  Semester,
  PureSemester,
  PUT_SEMESTER,
  CHANGE_SEMESTER,
  CHANGE_LOADING_SEMESTER,
} from './types';
import { LoadingState } from '../../loading/types';

export const putSemester = (semester: Semester): SemesterActionTypes => ({
  type: PUT_SEMESTER,
  payload: semester,
});

export const changeSemester = (id: number, semester: PureSemester): SemesterActionTypes => ({
  type: CHANGE_SEMESTER,
  payload: {
    id,
    model: semester,
  },
});

export const changeSemesterLoadingState = (state: LoadingState): SemesterActionTypes => ({
  type: CHANGE_LOADING_SEMESTER,
  state: state,
});
