import {
  ControlEventTypeState,
  ControlEventTypeActionTypes,
  PUT_CONTROL_EVENT_TYPE,
  CHANGE_CONTROL_EVENT_TYPE,
} from './types';

const initialState: ControlEventTypeState = {};

export default function controlEventTypeReducer(
  state: ControlEventTypeState = initialState,
  action: ControlEventTypeActionTypes,
) {
  switch (action.type) {
    case PUT_CONTROL_EVENT_TYPE:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_CONTROL_EVENT_TYPE:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
