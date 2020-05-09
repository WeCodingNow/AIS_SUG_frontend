import {
  ControlEventTypeState,
  ControlEventTypeActionTypes,
  PUT_CONTROL_EVENT_TYPE,
  CHANGE_CONTROL_EVENT_TYPE,
  CHANGE_LOADING_CONTROL_EVENT_TYPE,
} from './types';

const initialState: ControlEventTypeState = {
  byID: {},
};

export default function controlEventTypeReducer(
  state: ControlEventTypeState = initialState,
  action: ControlEventTypeActionTypes,
) {
  switch (action.type) {
    case PUT_CONTROL_EVENT_TYPE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_CONTROL_EVENT_TYPE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_CONTROL_EVENT_TYPE:
      return {
        ...state,
        loading: action.state,
      };
    default:
      return state;
  }
}
