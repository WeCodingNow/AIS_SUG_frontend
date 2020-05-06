import { ContactTypeState, ContactTypeActionTypes, PUT_CONTACT_TYPE, CHANGE_CONTACT_TYPE } from './types';

const initialState: ContactTypeState = {};

export default function contactTypeReducer(state: ContactTypeState = initialState, action: ContactTypeActionTypes) {
  switch (action.type) {
    case PUT_CONTACT_TYPE:
      return { ...state, [action.payload.id]: action.payload };
    case CHANGE_CONTACT_TYPE:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload.model },
      };
    default:
      return state;
  }
}
