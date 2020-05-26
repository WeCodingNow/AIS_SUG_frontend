import { ActionCreator } from 'redux';

import {
  StudentViewsActions,
  STUDENT_PUT_SELECTED_DISCIPLINE,
  STUDENT_PUT_SELECTED_SEMESTER,
  STUDENT_DESELECT_DISCIPLINE,
  STUDENT_DESELECT_SEMESTER,
  STUDENT_PUT_STUDENT,
  STUDENT_START_LOADING_STUDENT,
  STUDENT_FINISHED_LOADING_STUDENT,
  STUDENT_FAIL_LOADING_STUDENT,
} from './types';

import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';

export const putSelectedSemester: ActionCreator<StudentViewsActions> = (semester: Semester) => ({
  type: STUDENT_PUT_SELECTED_SEMESTER,
  payload: semester,
});

export const putSelecteDiscipline: ActionCreator<StudentViewsActions> = (discipline: Discipline) => ({
  type: STUDENT_PUT_SELECTED_DISCIPLINE,
  payload: discipline,
});

export const deselectSemester: ActionCreator<StudentViewsActions> = () => ({
  type: STUDENT_DESELECT_SEMESTER,
});

export const deselectStudentDiscipline: ActionCreator<StudentViewsActions> = () => ({
  type: STUDENT_DESELECT_DISCIPLINE,
});

export const putOwnStudent: ActionCreator<StudentViewsActions> = (student: Student) => ({
  type: STUDENT_PUT_STUDENT,
  payload: student,
});

export const startLoadingOwnStudent: ActionCreator<StudentViewsActions> = () => ({
  type: STUDENT_START_LOADING_STUDENT,
});

export const finishLoadingOwnStudent: ActionCreator<StudentViewsActions> = () => ({
  type: STUDENT_FINISHED_LOADING_STUDENT,
});

export const failLoadingOwnStudent: ActionCreator<StudentViewsActions> = () => ({
  type: STUDENT_FAIL_LOADING_STUDENT,
});
