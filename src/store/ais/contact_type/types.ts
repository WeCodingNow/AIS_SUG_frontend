import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureContactType {
  def: string;
}

export interface ContactType extends Model, PureContactType {}

export const toContactType = (data: any): ContactType => ({
  id: data['id'],
  def: data['def'],
});

export interface ContactTypeState extends ModelState<ContactType>, Loadable {}

export const PUT_CONTACT_TYPE = 'PUT_CONTACT_TYPE';
interface PutContactType extends Action<typeof PUT_CONTACT_TYPE> {
  payload: ContactType;
}

export const CHANGE_CONTACT_TYPE = 'CHANGE_CONTACT_TYPE';
interface ChangeContactType extends Action<typeof CHANGE_CONTACT_TYPE> {
  payload: ChangeAction<PureContactType>;
}

export const CHANGE_LOADING_CONTACT_TYPE = 'CHANGE_LOADING_CONTACT_TYPE';
export type ChangeLoadingContactType = LoadingAction<typeof CHANGE_LOADING_CONTACT_TYPE>;

export type ContactTypeActionTypes = PutContactType | ChangeContactType | ChangeLoadingContactType;
