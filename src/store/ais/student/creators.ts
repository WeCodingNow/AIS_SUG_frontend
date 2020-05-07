import { StudentActionTypes, Student, PureStudent, PUT_STUDENT, CHANGE_STUDENT } from './types';

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
