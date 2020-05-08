import { CathedraState, CathedraActionTypes, PUT_CATHEDRA, CHANGE_CATHEDRA, CHANGE_LOADING_CATHEDRA } from './types';

const initialState: CathedraState = {
  byID: {},
};

export default function cathedraReducer(state: CathedraState = initialState, action: CathedraActionTypes) {
  switch (action.type) {
    case PUT_CATHEDRA:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_CATHEDRA:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_CATHEDRA:
      return {
        ...state,
        loading: action.state,
      };
    default:
      return state;
  }
}
