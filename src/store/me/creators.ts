import { MeActionTypes, Role, PUT_ROLE, CLEAR_ME, Info, PUT_INFO } from './types';

export const putRole = (role: Role): MeActionTypes => ({
  type: PUT_ROLE,
  payload: role,
});

export const putInfo = (info: Info): MeActionTypes => ({
  type: PUT_INFO,
  payload: info,
});

export const clearMe = (): MeActionTypes => ({
  type: CLEAR_ME,
});
