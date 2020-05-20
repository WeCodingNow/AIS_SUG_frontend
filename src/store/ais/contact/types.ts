import { Action } from 'redux';
import { Model, ModelState, ChangeAction } from '../../types';
import { Loadable, LoadingAction } from '../../loading/types';

export interface PureContact {
  def: string;
  typeID: number;
}

export interface Contact extends Model, PureContact {}

export const toContact = (data: any): Contact => ({
  id: data['id'],
  def: data['def'],
  typeID: data['type']['id'],
});

export interface ContactState extends ModelState<Contact>, Loadable {}

export const PUT_CONTACT = 'PUT_CONTACT';
interface PutContact extends Action<typeof PUT_CONTACT> {
  payload: Contact;
}

export const CHANGE_CONTACT = 'CHANGE_CONTACT';
interface ChangeContact extends Action<typeof CHANGE_CONTACT> {
  payload: ChangeAction<PureContact>;
}

export const CHANGE_LOADING_CONTACT = 'CHANGE_LOADING_CONTACT';
export type ChangeLoadingContact = LoadingAction<typeof CHANGE_LOADING_CONTACT>;

export type ContactActionTypes = PutContact | ChangeContact | ChangeLoadingContact;
