import { ThunkAction } from 'redux-thunk';
// import { ContactActionTypes } from './types';
// import { putContactCreator, changeContactCreator } from './creators';
import { State } from '../../store';

import AisAPI from '../../../services/ais';
import { Action } from 'redux';

type ThunkResult<R> = ThunkAction<R, State, undefined, Action>;

export const getContacts = (): ThunkResult<void> => async () => {
  try {
    const resp = await AisAPI.Contact.Get();
    const jsonedResp = await resp.json();

    console.log(jsonedResp);
  } catch (e) {
    console.log(e);
  }
};

// export const getContact()
