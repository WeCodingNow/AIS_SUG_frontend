import { CathedraState, CathedraActionTypes, PUT_CATHEDRA, CHANGE_CATHEDRA } from './types';

const initialState: CathedraState = {};

export default function cathedraReducer(state: CathedraState = initialState, action: CathedraActionTypes) {
  switch (action.type) {
    case PUT_CATHEDRA:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_CATHEDRA:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
