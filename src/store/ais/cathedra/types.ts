import { Action } from 'redux';

import { Model, ChangeAction, ModelState } from '../types';
import { LoadingAction, Loadable } from '../../loading/types';

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

export interface CathedraState extends ModelState<Cathedra>, Loadable {}

export const PUT_CATHEDRA = 'PUT_CATHEDRA';
interface PutCathedra extends Action<typeof PUT_CATHEDRA> {
  payload: Cathedra;
}

export const CHANGE_CATHEDRA = 'CHANGE_CATHEDRA';
interface ChangeCathedra extends Action<typeof CHANGE_CATHEDRA> {
  payload: ChangeAction<PureCathedra>;
}

export const CHANGE_LOADING_CATHEDRA = 'CHANGE_LOADING_CATHEDRA';
export type ChangeLoadingCathedra = LoadingAction<typeof CHANGE_LOADING_CATHEDRA>;

export type CathedraActionTypes = PutCathedra | ChangeCathedra | ChangeLoadingCathedra;
