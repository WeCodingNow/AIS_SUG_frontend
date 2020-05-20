import { SemesterState, SemesterActionTypes, PUT_SEMESTER, CHANGE_SEMESTER, CHANGE_LOADING_SEMESTER } from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: SemesterState = {
  byID: {},
};

export default function semesterReducer(
  state: SemesterState = initialState,
  action: SemesterActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_SEMESTER:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_SEMESTER:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_SEMESTER:
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
