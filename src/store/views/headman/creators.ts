import { ActionCreator } from 'redux';

import {
  HeadmanViewsActions,
  HEADMAN_PUT_SELECTED_STUDENT,
  HEADMAN_PUT_SELECTED_DISCIPLINE,
  HEADMAN_PUT_SELECTED_SEMESTER,
  HEADMAN_DESELECT_STUDENT,
  HEADMAN_DESELECT_DISCIPLINE,
  HEADMAN_DESELECT_SEMESTER,
  HEADMAN_PUT_GROUP,
  HEADMAN_START_LOADING_GROUP,
  HEADMAN_FINISHED_LOADING_GROUP,
  HEADMAN_FAIL_LOADING_GROUP,
  HEADMAN_APPLY_MOSCOWITE_FILTER,
  HEADMAN_APPLY_COMMUNITY_FILTER,
} from './types';

import { Student } from '../../ais/student/types';
import { Discipline } from '../../ais/discipline/types';
import { Semester } from '../../ais/semester/types';
import { Group } from '../../ais/group/types';

export const putSelectedStudent: ActionCreator<HeadmanViewsActions> = (student: Student) => ({
  type: HEADMAN_PUT_SELECTED_STUDENT,
  payload: student,
});

export const putSelectedSemester: ActionCreator<HeadmanViewsActions> = (semester: Semester) => ({
  type: HEADMAN_PUT_SELECTED_SEMESTER,
  payload: semester,
});

export const selectStudentDiscipline: ActionCreator<HeadmanViewsActions> = (discipline: Discipline) => ({
  type: HEADMAN_PUT_SELECTED_DISCIPLINE,
  payload: discipline,
});

export const deselectStudent: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_DESELECT_STUDENT,
});

export const deselectSemester: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_DESELECT_SEMESTER,
});

export const deselectStudentDiscipline: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_DESELECT_DISCIPLINE,
});

export const putOwnGroup: ActionCreator<HeadmanViewsActions> = (group: Group) => ({
  type: HEADMAN_PUT_GROUP,
  payload: group,
});

export const startLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_START_LOADING_GROUP,
});

export const finishLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_FINISHED_LOADING_GROUP,
});

export const failLoadingOwnGroup: ActionCreator<HeadmanViewsActions> = () => ({
  type: HEADMAN_FAIL_LOADING_GROUP,
});

export const applyMoscowiteFilter: ActionCreator<HeadmanViewsActions> = (filter: boolean) => ({
  type: HEADMAN_APPLY_MOSCOWITE_FILTER,
  payload: filter,
});

export const applyCommunityFilter: ActionCreator<HeadmanViewsActions> = (filter: boolean) => ({
  type: HEADMAN_APPLY_COMMUNITY_FILTER,
  payload: filter,
});
