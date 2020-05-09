import {
  ContactTypeActionTypes,
  ContactType,
  PureContactType,
  PUT_CONTACT_TYPE,
  CHANGE_CONTACT_TYPE,
  CHANGE_LOADING_CONTACT_TYPE,
} from './types';
import { LoadingState } from '../../loading/types';

export const putContactType = (contactType: ContactType): ContactTypeActionTypes => ({
  type: PUT_CONTACT_TYPE,
  payload: contactType,
});

export const changeContactType = (id: number, contactType: PureContactType): ContactTypeActionTypes => ({
  type: CHANGE_CONTACT_TYPE,
  payload: {
    id,
    model: contactType,
  },
});

export const changeContactTypeLoadingState = (state: LoadingState): ContactTypeActionTypes => ({
  type: CHANGE_LOADING_CONTACT_TYPE,
  state: state,
});
