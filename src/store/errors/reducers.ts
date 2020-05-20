import { ErrorState, ErrorActionTypes, SET_UNAUTHORIZED_ERROR } from './types';

const initialState: ErrorState = {
  unauthorized: false,
};

export default function errorReducer(state = initialState, action: ErrorActionTypes): ErrorState {
  switch (action.type) {
    case SET_UNAUTHORIZED_ERROR:
      return {
        ...state,
        unauthorized: action.unauthorized,
      };
    default:
      return state;
  }
}
