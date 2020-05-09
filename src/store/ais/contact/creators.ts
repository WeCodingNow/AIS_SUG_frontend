import { ContactActionTypes, Contact, PureContact, PUT_CONTACT, CHANGE_CONTACT, CHANGE_LOADING_CONTACT } from './types';
import { LoadingState } from '../../loading/types';

export const putContact = (contact: Contact): ContactActionTypes => ({
  type: PUT_CONTACT,
  payload: contact,
});

export const changeContact = (id: number, contact: PureContact): ContactActionTypes => ({
  type: CHANGE_CONTACT,
  payload: {
    id,
    model: contact,
  },
});

export const changeContactLoadingState = (state: LoadingState): ContactActionTypes => ({
  type: CHANGE_LOADING_CONTACT,
  state: state,
});
