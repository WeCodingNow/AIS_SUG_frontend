import { ContactActionTypes, Contact, PureContact, PUT_CONTACT, CHANGE_CONTACT } from './types';

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
