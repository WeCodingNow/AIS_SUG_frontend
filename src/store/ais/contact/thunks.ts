import { ThunkAction } from 'redux-thunk';

import { ContactActionTypes, Contact, toContact } from './types';
import { putContact } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, ContactActionTypes>;

export const getContact = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    console.log(id);
    const resp = await AisAPI.Contact.Get(id);
    const jsonedResp = await resp.json();

    console.log('in single getter ', jsonedResp);

    dispatch(putContact(toContact(jsonedResp)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get contact ", id);
  }
};

export const getContacts = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.Contact.Get();
    const jsonedResp = await resp.json();

    console.log('in multi getter', jsonedResp);

    jsonedResp.map((c: Contact) => dispatch(putContact(toContact(c))));
  } catch (e) {
    console.log(e);
    console.log("couldn't get contacts");
  }
};
