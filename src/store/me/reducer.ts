import { MeState, MeActionTypes, PUT_ROLE, CLEAR_ME, PUT_INFO } from './types';

const initialState: MeState = {};

export default function meReducer(state: MeState = initialState, action: MeActionTypes): MeState {
  switch (action.type) {
    case PUT_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case PUT_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case CLEAR_ME:
      return initialState;
    default:
      return state;
  }
}
