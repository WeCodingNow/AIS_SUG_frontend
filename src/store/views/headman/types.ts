import { Action } from 'redux';

import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';
import { Group } from '../../ais/group/types';
import { LoadingState } from '../../loading/types';

export interface HeadmanViewsState {
  selection: {
    student?: Student;
    discipline?: Discipline;
    semester?: Semester;
  };
  own: {
    group?: Group;
    loading: LoadingState;
    // students?: Array<Student>;
  };
  filters: {
    isMoscowite: boolean;
    isInCommunity: boolean;
  };
}

export const PUT_SELECTED_STUDENT = 'SELECT_STUDENT';
interface PutSelectedStudent extends Action<typeof PUT_SELECTED_STUDENT> {
  payload: Student;
}

export const DESELECT_STUDENT = 'DESELECT_STUDENT';
type DeselectStudent = Action<typeof DESELECT_STUDENT>;

export const PUT_SELECTED_SEMESTER = 'PUT_SELECTED_SEMESTER';
interface PutSelectedSemester extends Action<typeof PUT_SELECTED_SEMESTER> {
  payload: Semester;
}

export const DESELECT_SEMESTER = 'DESELECT_SEMESTER';
type DeselectSemester = Action<typeof DESELECT_SEMESTER>;

export const PUT_SELECTED_STUDENT_DISCIPLINE = 'SELECT_STUDENT_DISCIPLINE';
interface PutSelectedStudentDiscipline extends Action<typeof PUT_SELECTED_STUDENT_DISCIPLINE> {
  payload: Discipline;
}

export const DESELECT_STUDENT_DISCIPLINE = 'DESELECT_STUDENT_DISCIPLINE';
type DeselectStudentDiscipline = Action<typeof DESELECT_STUDENT_DISCIPLINE>;

export const PUT_OWN_GROUP = 'PUT_OWN_GROUP';
interface PutOwnGroup extends Action<typeof PUT_OWN_GROUP> {
  payload: Group;
}

export const START_LOADING_OWN_GROUP = 'START_LOADING_OWN_GROUP';
type StartLoadingOwnGroup = Action<typeof START_LOADING_OWN_GROUP>;

export const FINISHED_LOADING_OWN_GROUP = 'FINISHED_LOADING_OWN_GROUP';
type FinishLoadingOwnGroup = Action<typeof FINISHED_LOADING_OWN_GROUP>;

export const FAIL_LOADING_OWN_GROUP = 'FAIL_LOADING_OWN_GROUP';
type FailLoadingOwnGroup = Action<typeof FAIL_LOADING_OWN_GROUP>;

export const APPLY_MOSCOWITE_FILTER = 'APPLY_MOSCOWITE_FILTER';
interface ApplyMoscowiteFilter extends Action<typeof APPLY_MOSCOWITE_FILTER> {
  payload: boolean;
}

export const APPLY_COMMUNITY_FILTER = 'APPLY_COMMUNITY_FILTER';
interface ApplyCommunityFilter extends Action<typeof APPLY_COMMUNITY_FILTER> {
  payload: boolean;
}

export type HeadmanViewsActions =
  | PutSelectedStudent
  | DeselectStudent
  | PutSelectedSemester
  | DeselectSemester
  | PutSelectedStudentDiscipline
  | PutOwnGroup
  | DeselectStudentDiscipline
  | StartLoadingOwnGroup
  | FinishLoadingOwnGroup
  | FailLoadingOwnGroup
  | ApplyMoscowiteFilter
  | ApplyCommunityFilter;
