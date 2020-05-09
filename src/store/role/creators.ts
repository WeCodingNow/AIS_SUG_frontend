import { RoleActionTypes, Role, PUT_ROLE, CLEAR_ROLE } from './types';

export const putRole = (role: Role): RoleActionTypes => ({
  type: PUT_ROLE,
  payload: role,
});

export const clearRole = (): RoleActionTypes => ({
  type: CLEAR_ROLE,
});
