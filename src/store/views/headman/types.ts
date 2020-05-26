import { Action } from 'redux';

import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';
import { Group } from '../../ais/group/types';
import { LoadingState } from '../../loading/types';

export interface HeadmanViewsState {
  selection: {
    semester?: Semester;
    student?: Student;
    discipline?: Discipline;
  };
  own: {
    group?: Group;
    loading: LoadingState;
  };
  filters: {
    isMoscowite: boolean;
    isInCommunity: boolean;
  };
}

export const HEADMAN_PUT_SELECTED_STUDENT = 'HEADMAN_PUT_SELECTED_STUDENT';
interface PutSelectedStudent extends Action<typeof HEADMAN_PUT_SELECTED_STUDENT> {
  payload: Student;
}

export const HEADMAN_DESELECT_STUDENT = 'HEADMAN_DESELECT_STUDENT';
type DeselectStudent = Action<typeof HEADMAN_DESELECT_STUDENT>;

export const HEADMAN_PUT_SELECTED_SEMESTER = 'HEADMAN_PUT_SELECTED_SEMESTER';
interface PutSelectedSemester extends Action<typeof HEADMAN_PUT_SELECTED_SEMESTER> {
  payload: Semester;
}

export const HEADMAN_DESELECT_SEMESTER = 'DESELECT_SEMESTER';
type DeselectSemester = Action<typeof HEADMAN_DESELECT_SEMESTER>;

export const HEADMAN_PUT_SELECTED_DISCIPLINE = 'HEADMAN_PUT_SELECTED_DISCIPLINE';
interface PutSelectedStudentDiscipline extends Action<typeof HEADMAN_PUT_SELECTED_DISCIPLINE> {
  payload: Discipline;
}

export const HEADMAN_DESELECT_DISCIPLINE = 'HEADMAN_DESELECT_DISCIPLINE';
type DeselectStudentDiscipline = Action<typeof HEADMAN_DESELECT_DISCIPLINE>;

export const HEADMAN_PUT_GROUP = 'PUT_OWN_GROUP';
interface PutOwnGroup extends Action<typeof HEADMAN_PUT_GROUP> {
  payload: Group;
}

export const HEADMAN_START_LOADING_GROUP = 'HEADMAN_START_LOADING_GROUP';
type StartLoadingOwnGroup = Action<typeof HEADMAN_START_LOADING_GROUP>;

export const HEADMAN_FINISHED_LOADING_GROUP = 'HEADMAN_FINISHED_LOADING_GROUP';
type FinishLoadingOwnGroup = Action<typeof HEADMAN_FINISHED_LOADING_GROUP>;

export const HEADMAN_FAIL_LOADING_GROUP = 'HEADMAN_FAIL_LOADING_GROUP';
type FailLoadingOwnGroup = Action<typeof HEADMAN_FAIL_LOADING_GROUP>;

export const HEADMAN_APPLY_MOSCOWITE_FILTER = 'HEADMAN_APPLY_MOSCOWITE_FILTER';
interface ApplyMoscowiteFilter extends Action<typeof HEADMAN_APPLY_MOSCOWITE_FILTER> {
  payload: boolean;
}

export const HEADMAN_APPLY_COMMUNITY_FILTER = 'HEADMAN_APPLY_COMMUNITY_FILTER';
interface ApplyCommunityFilter extends Action<typeof HEADMAN_APPLY_COMMUNITY_FILTER> {
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
