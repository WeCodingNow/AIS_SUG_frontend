import { MarkState, MarkActionTypes, PUT_MARK, CHANGE_MARK, CHANGE_LOADING_MARK } from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: MarkState = {
  byID: {},
};

export default function markReducer(state: MarkState = initialState, action: MarkActionTypes | GeneralAISActionType) {
  switch (action.type) {
    case PUT_MARK:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_MARK:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_MARK:
      return {
        ...state,
        loading: action.state,
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
