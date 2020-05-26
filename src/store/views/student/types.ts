import { Action } from 'redux';

import { LoadingState } from '../../loading/types';
import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';

export interface StudentViewsState {
  selection: {
    semester?: Semester;
    discipline?: Discipline;
  };
  own: {
    student?: Student;
    loading: LoadingState;
  };
}

export const STUDENT_PUT_SELECTED_SEMESTER = 'STUDENT_PUT_SELECTED_SEMESTER';
interface PutSelectedSemester extends Action<typeof STUDENT_PUT_SELECTED_SEMESTER> {
  payload: Semester;
}

export const STUDENT_DESELECT_SEMESTER = 'STUDENT_DESELECT_SEMESTER';
type DeselectSemester = Action<typeof STUDENT_DESELECT_SEMESTER>;

export const STUDENT_PUT_SELECTED_DISCIPLINE = 'STUDENT_PUT_SELECTED_DISCIPLINE';
interface PutSelectedStudentDiscipline extends Action<typeof STUDENT_PUT_SELECTED_DISCIPLINE> {
  payload: Discipline;
}

export const STUDENT_PUT_STUDENT = 'PUT_OWN_STUDENT';
interface PutOwnStudent extends Action<typeof STUDENT_PUT_STUDENT> {
  payload: Student;
}

export const STUDENT_DESELECT_DISCIPLINE = 'STUDENT_DESELECT_DISCIPLINE';
type DeselectStudentDiscipline = Action<typeof STUDENT_DESELECT_DISCIPLINE>;

export const STUDENT_START_LOADING_STUDENT = 'STUDENT_START_LOADING_GROUP';
type StartLoadingOwnGroup = Action<typeof STUDENT_START_LOADING_STUDENT>;

export const STUDENT_FINISHED_LOADING_STUDENT = 'STUDENT_FINISHED_LOADING_GROUP';
type FinishLoadingOwnGroup = Action<typeof STUDENT_FINISHED_LOADING_STUDENT>;

export const STUDENT_FAIL_LOADING_STUDENT = 'STUDENT_FAIL_LOADING_GROUP';
type FailLoadingOwnGroup = Action<typeof STUDENT_FAIL_LOADING_STUDENT>;

export type StudentViewsActions =
  | PutSelectedSemester
  | PutOwnStudent
  | DeselectSemester
  | PutSelectedStudentDiscipline
  | DeselectStudentDiscipline
  | StartLoadingOwnGroup
  | FinishLoadingOwnGroup
  | FailLoadingOwnGroup;
