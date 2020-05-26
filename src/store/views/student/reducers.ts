import {
  StudentViewsState,
  StudentViewsActions,
  STUDENT_PUT_SELECTED_DISCIPLINE,
  STUDENT_DESELECT_DISCIPLINE,
  STUDENT_DESELECT_SEMESTER,
  STUDENT_PUT_SELECTED_SEMESTER,
  STUDENT_PUT_STUDENT,
  STUDENT_START_LOADING_STUDENT,
  STUDENT_FINISHED_LOADING_STUDENT,
  STUDENT_FAIL_LOADING_STUDENT,
} from './types';

import { GeneralAISActionType, CLEAR_AIS } from '../../types';
import { FAILED, LOADING, SUCCESS } from '../../loading/types';

const initialState: StudentViewsState = {
  selection: {},
  own: { loading: FAILED },
};

export default function headmanViewsReducer(
  state = initialState,
  action: StudentViewsActions | GeneralAISActionType,
): StudentViewsState {
  switch (action.type) {
    case STUDENT_PUT_SELECTED_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: action.payload },
      };
    case STUDENT_DESELECT_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: undefined },
      };
    case STUDENT_PUT_SELECTED_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: action.payload },
      };
    case STUDENT_DESELECT_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: undefined },
      };
    case STUDENT_PUT_STUDENT:
      return {
        ...state,
        own: {
          ...state.own,
          student: action.payload,
        },
      };
    case STUDENT_START_LOADING_STUDENT:
      return {
        ...state,
        own: {
          ...state.own,
          loading: LOADING,
        },
      };
    case STUDENT_FINISHED_LOADING_STUDENT:
      return {
        ...state,
        own: {
          ...state.own,
          loading: SUCCESS,
        },
      };
    case STUDENT_FAIL_LOADING_STUDENT:
      return {
        ...state,
        own: {
          ...state.own,
          loading: FAILED,
        },
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
