import { Action } from 'redux';
import { Model, HashTable, ChangeAction } from '../types';

export interface PureCathedra {
  name: string;
  shortName: string;

  groupIDs: Array<number>;
}

export interface Cathedra extends Model, PureCathedra {}

export const toCathedra = (data: any): Cathedra => ({
  id: data['id'],
  name: data['name'],
  shortName: data['short_name'],

  groupIDs: data['groups'].map((g: any) => g['id']),
});

export type CathedraState = HashTable<Cathedra>;

export const PUT_CATHEDRA = 'PUT_CATHEDRA';
export const CHANGE_CATHEDRA = 'CHANGE_CATHEDRA';

interface PutCathedra extends Action<typeof PUT_CATHEDRA> {
  payload: Cathedra;
}

interface ChangeCathedra extends Action<typeof CHANGE_CATHEDRA> {
  payload: ChangeAction<PureCathedra>;
}

export type CathedraActionTypes = PutCathedra | ChangeCathedra;
