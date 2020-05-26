import {
  HeadmanViewsState,
  HeadmanViewsActions,
  HEADMAN_PUT_SELECTED_STUDENT,
  HEADMAN_PUT_SELECTED_DISCIPLINE,
  HEADMAN_DESELECT_STUDENT,
  HEADMAN_DESELECT_DISCIPLINE,
  HEADMAN_DESELECT_SEMESTER,
  HEADMAN_PUT_SELECTED_SEMESTER,
  HEADMAN_PUT_GROUP,
  HEADMAN_START_LOADING_GROUP,
  HEADMAN_FINISHED_LOADING_GROUP,
  HEADMAN_FAIL_LOADING_GROUP,
  HEADMAN_APPLY_COMMUNITY_FILTER,
  HEADMAN_APPLY_MOSCOWITE_FILTER,
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
    case HEADMAN_PUT_SELECTED_STUDENT:
      return {
        ...state,
        selection: { ...state.selection, student: action.payload },
      };
    case HEADMAN_DESELECT_STUDENT:
      return {
        ...state,
        selection: { ...state.selection, student: undefined },
      };
    case HEADMAN_PUT_SELECTED_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: action.payload },
      };
    case HEADMAN_DESELECT_SEMESTER:
      return {
        ...state,
        selection: { ...state.selection, semester: undefined },
      };
    case HEADMAN_PUT_SELECTED_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: action.payload },
      };
    case HEADMAN_DESELECT_DISCIPLINE:
      return {
        ...state,
        selection: { ...state.selection, discipline: undefined },
      };
    case HEADMAN_PUT_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          group: action.payload,
        },
      };
    case HEADMAN_START_LOADING_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: LOADING,
        },
      };
    case HEADMAN_FINISHED_LOADING_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: SUCCESS,
        },
      };
    case HEADMAN_FAIL_LOADING_GROUP:
      return {
        ...state,
        own: {
          ...state.own,
          loading: FAILED,
        },
      };
    case HEADMAN_APPLY_MOSCOWITE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          isMoscowite: action.payload,
        },
      };
    case HEADMAN_APPLY_COMMUNITY_FILTER:
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
