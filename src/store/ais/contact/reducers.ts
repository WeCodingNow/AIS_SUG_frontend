import { ContactState, ContactActionTypes, PUT_CONTACT, CHANGE_CONTACT } from './types';

const initialState: ContactState = {};

export default function contactReducer(state: ContactState = initialState, action: ContactActionTypes) {
  switch (action.type) {
    case PUT_CONTACT:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_CONTACT:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
