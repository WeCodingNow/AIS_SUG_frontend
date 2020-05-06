import { Model, HashTable, ChangeAction } from '../types';

export interface PureContactType {
  def: string;
}

export interface ContactType extends Model, PureContactType {}

export type ContactTypeState = HashTable<ContactType>;

export const PUT_CONTACT_TYPE = 'PUT_CONTACT_TYPE';
export const CHANGE_CONTACT_TYPE = 'CHANGE_CONTACT_TYPE';

interface PutContactType {
  type: typeof PUT_CONTACT_TYPE;
  payload: ContactType;
}

interface ChangeContactType {
  type: typeof CHANGE_CONTACT_TYPE;
  payload: ChangeAction<PureContactType>;
}

export type ContactTypeActionTypes = PutContactType | ChangeContactType;
