import { ResidenceState, ResidenceActionTypes, PUT_RESIDENCE, CHANGE_RESIDENCE } from './types';

const initialState: ResidenceState = {};

export default function residenceReducer(state: ResidenceState = initialState, action: ResidenceActionTypes) {
  switch (action.type) {
    case PUT_RESIDENCE:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_RESIDENCE:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
