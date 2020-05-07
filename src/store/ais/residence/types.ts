import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureResidence {
  address: string;
  city: string;
  community: boolean;

  studentIDs: Array<number>;
}

export interface Residence extends Model, PureResidence {}

export const toResidence = (data: any): Residence => ({
  id: data['id'],
  address: data['address'],
  city: data['city'],
  community: data['community'],

  studentIDs: data['students'].map((s: any) => s['id']),
});

export type ResidenceState = HashTable<Residence>;

export const PUT_RESIDENCE = 'PUT_RESIDENCE';
export const CHANGE_RESIDENCE = 'CHANGE_RESIDENCE';

interface PutResidence extends Action<typeof PUT_RESIDENCE> {
  payload: Residence;
}

interface ChangeResidence extends Action<typeof CHANGE_RESIDENCE> {
  payload: ChangeAction<PureResidence>;
}

export type ResidenceActionTypes = PutResidence | ChangeResidence;
