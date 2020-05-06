import { Model, HashTable, ChangeAction } from '../types';

export interface PureContact {
  def: string;
  typeID: number;
}

export interface Contact extends Model, PureContact {}

export type ContactState = HashTable<Contact>;

export const PUT_CONTACT = 'PUT_CONTACT';
export const CHANGE_CONTACT = 'CHANGE_CONTACT';

interface PutContact {
  type: typeof PUT_CONTACT;
  payload: Contact;
}

interface ChangeContact {
  type: typeof CHANGE_CONTACT;
  payload: ChangeAction<PureContact>;
}

export type ContactActionTypes = PutContact | ChangeContact;
