import {
  HeadmanViewsState,
  HeadmanViewsActions,
  PUT_SELECTED_STUDENT,
  PUT_SELECTED_STUDENT_DISCIPLINE,
  DESELECT_STUDENT,
  DESELECT_STUDENT_DISCIPLINE,
  DESELECT_SEMESTER,
  PUT_SELECTED_SEMESTER,
  PUT_OWN_GROUP,
  START_LOADING_OWN_GROUP,
  FINISHED_LOADING_OWN_GROUP,
  FAIL_LOADING_OWN_GROUP,
  APPLY_COMMUNITY_FILTER,
  APPLY_MOSCOWITE_FILTER,
} from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';
import { FAILED, LOADING, SUCCESS } from '../../loading/types';

const initialState: HeadmanViewsState = {
  selection: {},
  own: { loading: FAILED },
  filters: { isInCommunity: false, isMoscowite: true },
};

export default function headmanViewsReducer(
  state = initialState,
  action: HeadmanViewsActions | GeneralAISActionType,
): HeadmanViewsState {
  switch (action.type) {
    case PUT_SELECTED_STUDENT:
      return {
        ...state,
        selection: { ...state.selection, student: action.payload },
      };
    case DESELECT_STUDENT:
      return {
        ...state,
        selection: { ...state.selection, student: undefined },
      };
    case PUT_SELECTED_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: action.payload },
      };
    case DESELECT_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: undefined },
      };
    case PUT_SELECTED_STUDENT_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: action.payload },
      };
    case DESELECT_STUDENT_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: undefined },
      };
    case PUT_OWN_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          group: action.payload,
        },
      };
    case START_LOADING_OWN_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: LOADING,
        },
      };
    case FINISHED_LOADING_OWN_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: SUCCESS,
        },
      };
    case FAIL_LOADING_OWN_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: FAILED,
        },
      };
    case APPLY_MOSCOWITE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          isMoscowite: action.payload,
        },
      };
    case APPLY_COMMUNITY_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          isInCommunity: action.payload,
        },
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
