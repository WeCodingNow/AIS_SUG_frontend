import { RoleState, RoleActionTypes, PUT_ROLE, CLEAR_ROLE } from './types';

const initialState: RoleState = {};

export default function roleReducer(state: RoleState = initialState, action: RoleActionTypes): RoleState {
  switch (action.type) {
    case PUT_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case CLEAR_ROLE:
      return initialState;
    default:
      return state;
  }
}
