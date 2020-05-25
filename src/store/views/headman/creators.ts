import { ActionCreator } from 'redux';

import {
  HeadmanViewsActions,
  PUT_SELECTED_STUDENT,
  PUT_SELECTED_STUDENT_DISCIPLINE,
  PUT_SELECTED_SEMESTER,
  DESELECT_STUDENT,
  DESELECT_STUDENT_DISCIPLINE,
  DESELECT_SEMESTER,
  PUT_OWN_GROUP,
  START_LOADING_OWN_GROUP,
  FINISHED_LOADING_OWN_GROUP,
  FAIL_LOADING_OWN_GROUP,
  APPLY_MOSCOWITE_FILTER,
  APPLY_COMMUNITY_FILTER,
} from './types';

import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';
import { Group } from '../../ais/group/types';

export const putSelectedStudent: ActionCreator<HeadmanViewsActions> = (student: Student) => ({
  type: PUT_SELECTED_STUDENT,
  payload: student,
});

export const putSelectedSemester: ActionCreator<HeadmanViewsActions> = (semester: Semester) => ({
  type: PUT_SELECTED_SEMESTER,
  payload: semester,
});

export const selectStudentDiscipline: ActionCreator<HeadmanViewsActions> = (discipline: Discipline) => ({
  type: PUT_SELECTED_STUDENT_DISCIPLINE,
  payload: discipline,
});

export const deselectStudent: ActionCreator<HeadmanViewsActions> = () => ({
  type: DESELECT_STUDENT,
});

export const deselectSemester: ActionCreator<HeadmanViewsActions> = () => ({
  type: DESELECT_SEMESTER,
});

export const deselectStudentDiscipline: ActionCreator<HeadmanViewsActions> = () => ({
  type: DESELECT_STUDENT_DISCIPLINE,
});

export const putOwnGroup: ActionCreator<HeadmanViewsActions> = (group: Group) => ({
  type: PUT_OWN_GROUP,
  payload: group,
});

export const startLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: START_LOADING_OWN_GROUP,
});

export const finishLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: FINISHED_LOADING_OWN_GROUP,
});

export const failLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: FAIL_LOADING_OWN_GROUP,
});

export const applyMoscowiteFilter: ActionCreator<HeadmanViewsActions> = (filter: boolean) => ({
  type: APPLY_MOSCOWITE_FILTER,
  payload: filter,
})

export const applyCommunityFilter: ActionCreator<HeadmanViewsActions> = (filter: boolean) => ({
  type: APPLY_COMMUNITY_FILTER,
  payload: filter,
})