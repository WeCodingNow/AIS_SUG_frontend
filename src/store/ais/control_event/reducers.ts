import { ControlEventState, ControlEventActionTypes, PUT_CONTROL_EVENT, CHANGE_CONTROL_EVENT } from './types';

const initialState: ControlEventState = {};

export function ControlEventReducer(state: ControlEventState = initialState, action: ControlEventActionTypes) {
  switch (action.type) {
    case PUT_CONTROL_EVENT:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_CONTROL_EVENT:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
