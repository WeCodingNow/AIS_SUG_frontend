/* eslint-disable @typescript-eslint/camelcase */
import { ThunkAction } from 'redux-thunk';

import AisAPI from '../../services/ais';

import { putStudentBinding, changeStudentBindingsLoadingState, changeRoleLoadingState, putRole } from './creators';
import { AdminActionTypes, toStudentBinding, toRole } from './types';
import { State } from '../store';
import { LOADING, SUCCESS, FAILED } from '../loading/types';

type ThunkResult<R> = ThunkAction<R, State, undefined, AdminActionTypes>;

export const getStudentBindings = (): ThunkResult<Promise<Array<any>>> => async () => {
  try {
    const resp = await AisAPI.StudentBindings.Get();

    return resp.json();
  } catch (e) {
    console.log(e);
  }
};

export const fillStudentBindings = (): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch(changeStudentBindingsLoadingState(LOADING));
    const bindings = await dispatch(getStudentBindings());

    bindings.map(toStudentBinding).forEach((sb) => dispatch(putStudentBinding(sb)));
    dispatch(changeStudentBindingsLoadingState(SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(changeStudentBindingsLoadingState(FAILED));
  }
};

export const getRoles = (): ThunkResult<Promise<Array<any>>> => async () => {
  try {
    const resp = await AisAPI.Roles.Get();

    return resp.json();
  } catch (e) {
    console.log(e);
  }
};

export const fillRoles = (): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch(changeRoleLoadingState(LOADING));
    const bindings = await dispatch(getRoles());

    bindings.map(toRole).forEach((sb) => dispatch(putRole(sb)));
    dispatch(changeRoleLoadingState(SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(changeRoleLoadingState(FAILED));
  }
};

export const promoteUser = (userID: number, roleID: number): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch(changeRoleLoadingState(LOADING));

    const resp = await AisAPI.Roles.Post({
      user_id: userID,
      role_id: roleID,
    });

    if (resp.status !== 200) {
      throw new Error("couldn't promote user");
    }

    // dispatch(fillRoles());
    dispatch(fillStudentBindings());
    dispatch(changeRoleLoadingState(SUCCESS));
  } catch (e) {
    console.log(e);
    dispatch(changeRoleLoadingState(FAILED));
  }
};
