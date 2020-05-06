import { SemesterState, SemesterActionTypes, PUT_SEMESTER, CHANGE_SEMESTER } from './types';

const initialState: SemesterState = {};

export function SemesterReducer(state: SemesterState = initialState, action: SemesterActionTypes) {
  switch (action.type) {
    case PUT_SEMESTER:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_SEMESTER:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
