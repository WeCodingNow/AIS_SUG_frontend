import { AuthState, AuthActionTypes, UNLOGGED, LOGOUT, CHANGE_LOGIN_STATE, SET_TOKEN_SUCCESS } from './types';

const initialState: AuthState = {
  loggedIn: UNLOGGED,
  tokenSet: false,
};

function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TOKEN_SUCCESS:
      return {
        ...state,
        tokenSet: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
