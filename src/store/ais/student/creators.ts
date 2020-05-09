import { StudentActionTypes, Student, PureStudent, PUT_STUDENT, CHANGE_STUDENT, CHANGE_LOADING_STUDENT } from './types';
import { LoadingState } from '../../loading/types';

export const putStudent = (student: Student): StudentActionTypes => ({
  type: PUT_STUDENT,
  payload: student,
});

export const changeStudent = (id: number, student: PureStudent): StudentActionTypes => ({
  type: CHANGE_STUDENT,
  payload: {
    id,
    model: student,
  },
});

export const changeStudentLoadingState = (state: LoadingState): StudentActionTypes => ({
  type: CHANGE_LOADING_STUDENT,
  state: state,
});
