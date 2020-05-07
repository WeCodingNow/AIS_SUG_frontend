import { SemesterActionTypes, Semester, PureSemester, PUT_SEMESTER, CHANGE_SEMESTER } from './types';

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
