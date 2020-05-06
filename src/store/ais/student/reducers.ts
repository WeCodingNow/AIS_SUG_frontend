import { StudentState, StudentActionTypes, PUT_STUDENT, CHANGE_STUDENT } from './types';

const initialState: StudentState = {};

export default function studentReducer(state: StudentState = initialState, action: StudentActionTypes) {
  switch (action.type) {
    case PUT_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_STUDENT:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
