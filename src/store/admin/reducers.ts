import {
  AdminState,
  AdminActionTypes,
  PUT_STUDENT_BINDING,
  CHANGE_LOADING_STUDENT_BINDINGS,
  PUT_ROLE_DEFINITION,
  CHANGE_LOADING_ROLE_DEFINITIONS,
} from './types';

import { CLEAR_AIS } from '../types';

const initialState: AdminState = {
  roles: { byID: {} },
  studentBindings: { byID: {} },
};

export default function adminReducer(state = initialState, action: AdminActionTypes): AdminState {
  switch (action.type) {
    case PUT_STUDENT_BINDING:
      return {
        ...state,
        studentBindings: {
          ...state.studentBindings,
          byID: {
            ...state.studentBindings.byID,
            [action.payload.studentID]: action.payload,
          },
        },
      };
    case CHANGE_LOADING_STUDENT_BINDINGS:
      return {
        ...state,
        studentBindings: {
          ...state.studentBindings,
          loading: action.state,
        },
      };
    case PUT_ROLE_DEFINITION:
      return {
        ...state,
        roles: {
          ...state.roles,
          byID: {
            ...state.roles.byID,
            [action.payload.id]: action.payload,
          },
        },
      };
    case CHANGE_LOADING_ROLE_DEFINITIONS:
      return {
        ...state,
        roles: {
          ...state.roles,
          loading: action.state,
        },
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
