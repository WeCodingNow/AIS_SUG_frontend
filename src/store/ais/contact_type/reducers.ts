import {
  ContactTypeState,
  ContactTypeActionTypes,
  PUT_CONTACT_TYPE,
  CHANGE_CONTACT_TYPE,
  CHANGE_LOADING_CONTACT_TYPE,
} from './types';

const initialState: ContactTypeState = {
  byID: {},
};

export default function contactTypeReducer(state: ContactTypeState = initialState, action: ContactTypeActionTypes) {
  switch (action.type) {
    case PUT_CONTACT_TYPE: {
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    }
    case CHANGE_CONTACT_TYPE:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_CONTACT_TYPE:
      return {
        ...state,
        loading: action.state,
      };
    default:
      return state;
  }
}
