import { StudentState, StudentActionTypes, PUT_STUDENT, CHANGE_STUDENT, CHANGE_LOADING_STUDENT } from './types';

const initialState: StudentState = {
  byID: {},
};

export default function studentReducer(state: StudentState = initialState, action: StudentActionTypes) {
  switch (action.type) {
    case PUT_STUDENT:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    case CHANGE_STUDENT:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_STUDENT:
      return {
        ...state,
        loading: action.state,
      };
    default:
      return state;
  }
}
