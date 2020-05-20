import {
  ControlEventState,
  ControlEventActionTypes,
  PUT_CONTROL_EVENT,
  CHANGE_CONTROL_EVENT,
  CHANGE_LOADING_CONTROL_EVENT,
} from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: ControlEventState = {
  byID: {},
};

export default function controlEventReducer(
  state: ControlEventState = initialState,
  action: ControlEventActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_CONTROL_EVENT:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_CONTROL_EVENT:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_CONTROL_EVENT:
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
