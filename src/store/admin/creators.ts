import { ActionCreator } from 'redux';

import {
  AdminActionTypes,
  PUT_STUDENT_BINDING,
  StudentBinding,
  CHANGE_LOADING_STUDENT_BINDINGS,
  PUT_ROLE_DEFINITION,
  Role,
  CHANGE_LOADING_ROLE_DEFINITIONS,
  PROMOTE_STUDENT,
} from './types';

import { LoadingState } from '../loading/types';

export const putStudentBinding = (studentBinding: StudentBinding): AdminActionTypes => ({
  type: PUT_STUDENT_BINDING,
  payload: studentBinding,
});

export const changeStudentBindingsLoadingState = (state: LoadingState): AdminActionTypes => ({
  type: CHANGE_LOADING_STUDENT_BINDINGS,
  state: state,
});

export const putRole = (role: Role): AdminActionTypes => ({
  type: PUT_ROLE_DEFINITION,
  payload: role,
});

export const changeRoleLoadingState: ActionCreator<AdminActionTypes> = (state: LoadingState) => ({
  type: CHANGE_LOADING_ROLE_DEFINITIONS,
  state: state,
});

export const promoteUser: ActionCreator<AdminActionTypes> = () => ({
  type: PROMOTE_STUDENT,
});
