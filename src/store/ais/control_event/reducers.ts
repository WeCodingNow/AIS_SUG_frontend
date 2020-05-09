import {
  ControlEventState,
  ControlEventActionTypes,
  PUT_CONTROL_EVENT,
  CHANGE_CONTROL_EVENT,
  CHANGE_LOADING_CONTROL_EVENT,
} from './types';

const initialState: ControlEventState = {
  byID: {},
};

export default function controlEventReducer(state: ControlEventState = initialState, action: ControlEventActionTypes) {
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
    default:
      return state;
  }
}
