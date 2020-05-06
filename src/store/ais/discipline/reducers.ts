import { DisciplineState, DisciplineActionTypes, PUT_DISCIPLINE, CHANGE_DISCIPLINE } from './types';

const initialState: DisciplineState = {};

export function DisciplineReducer(state: DisciplineState = initialState, action: DisciplineActionTypes) {
  switch (action.type) {
    case PUT_DISCIPLINE:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_DISCIPLINE:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
