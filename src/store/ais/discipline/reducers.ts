import {
  DisciplineState,
  DisciplineActionTypes,
  PUT_DISCIPLINE,
  CHANGE_DISCIPLINE,
  CHANGE_LOADING_DISCIPLINE,
} from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: DisciplineState = {
  byID: {},
};

export default function disciplineReducer(
  state: DisciplineState = initialState,
  action: DisciplineActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_DISCIPLINE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_DISCIPLINE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_DISCIPLINE:
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
