import { MarkState, MarkActionTypes, PUT_MARK, CHANGE_MARK } from './types';

const initialState: MarkState = {};

export default function markReducer(state: MarkState = initialState, action: MarkActionTypes) {
  switch (action.type) {
    case PUT_MARK:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_MARK:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
