import { ContactState, ContactActionTypes, PUT_CONTACT, CHANGE_CONTACT, CHANGE_LOADING_CONTACT } from './types';
import { GeneralAISActionType, CLEAR_AIS } from '../../types';

const initialState: ContactState = {
  byID: {},
};

export default function contactReducer(
  state: ContactState = initialState,
  action: ContactActionTypes | GeneralAISActionType,
) {
  switch (action.type) {
    case PUT_CONTACT: {
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { ...action.payload } },
      };
    }
    case CHANGE_CONTACT:
      return {
        ...state,
        byID: { ...state.byID, [action.payload.id]: { id: action.payload.id, ...action.payload.model } },
      };
    case CHANGE_LOADING_CONTACT:
      return {
        ...state,
        loading: action.state,
      };
    case CLEAR_AIS:
      return initialState;
    default:
      return state;
  }
}
