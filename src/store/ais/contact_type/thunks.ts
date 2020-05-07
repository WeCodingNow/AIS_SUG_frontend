import { ThunkAction } from 'redux-thunk';

import { ContactTypeActionTypes, ContactType } from './types';
import { putContactType } from './creators';

import { State } from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, ContactTypeActionTypes>;

export const getContactType = (id: number): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ContactType.Get(id);
    const jsonedResp = await resp.json();

    dispatch(putContactType(jsonedResp));
  } catch (e) {
    console.log(e);
    console.log("couldn't get contact type ", id);
  }
};

export const getContactTypes = (): ThunkResult<void> => async (dispatch) => {
  try {
    const resp = await AisAPI.ContactType.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map((c: ContactType) => dispatch(putContactType(c)));
  } catch (e) {
    console.log(e);
    console.log("couldn't get contact types");
  }
};
