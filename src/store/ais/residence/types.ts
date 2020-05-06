import { Model, HashTable, ChangeAction } from '../types';

export interface PureResidence {
  address: string;
  city: string;
  community: boolean;

  studentIDs: Array<number>;
}

export interface Residence extends Model, PureResidence {}

export type ResidenceState = HashTable<Residence>;

export const PUT_RESIDENCE = 'PUT_RESIDENCE';
export const CHANGE_RESIDENCE = 'CHANGE_RESIDENCE';

interface PutResidence {
  type: typeof PUT_RESIDENCE;
  payload: Residence;
}

interface ChangeResidence {
  type: typeof CHANGE_RESIDENCE;
  payload: ChangeAction<PureResidence>;
}

export type ResidenceActionTypes = PutResidence | ChangeResidence;
